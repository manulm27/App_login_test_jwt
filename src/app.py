"""
Este módulo se encarga de iniciar el servidor API, cargar la base de datos y agregar los puntos finales
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# configuracion de base de datos y jwt (token)
db_url = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "type_secret"
jwt = JWTManager(app)
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# permitir solicitudes de CORS a esta API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Agregue todos los puntos finales de la API con el prefijo "api"
app.register_blueprint(api, url_prefix='/api')

# Manejar/serializar errores como un objeto JSON
@app.errorhandler(APIException)
def handle_invalid_usage(error):

    return jsonify(error.to_dict()), error.status_code

# generar mapa del sitio con todos sus puntos finales
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)

    return send_from_directory(static_file_dir, 'index.html')

# cualquier otro punto final intentará servirlo como un archivo estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory

    return response

@app.route('/token', methods=['POST'])
def create_token():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter(User.username==username, User.password==password).first()
    if user == None:
        return jsonify({'message_error': 'user not exist'}), 401
    else:
        access_token = create_access_token(identity=user.id)
        return jsonify(
            {
                'token': access_token,
                'user.id': user.id
            }
        )

#private endpoint
@app.route('/example/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify([{'id': user.id, 'username': user.username}])

@app.route('/user', methods=['POST'])
def user():
    body = request.get_json()
    user = User(username=body['username'], email=body['email'], password=body['password'])
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "send data"
    }

    return jsonify(response_body), 200

# esto solo se ejecuta si se ejecuta `$ python src/main.py`
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
