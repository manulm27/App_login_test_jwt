"""
Este módulo se encarga de iniciar el servidor API, cargar la base de datos y agregar los puntos finales
"""
import os
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
from flask import Flask, request, jsonify, url_for, send_from_directory, json
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Token
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

@app.route('/user', methods=['POST'])
def add_user():
    body = request.get_json()
    print(body)

    if len(request.get_json()) == 0:
        return jsonify({"message": "Enter you data."}), 401
    elif 'username' not in body:
        return jsonify({'message': 'you must add a username'}), 401
    elif 'email' not in body:
        return jsonify({'message': 'you must add a email'}), 401
    elif 'password' not in body:
        return jsonify({'message': 'you must add a password'}), 401
    else:
        validationA = User.query.filter_by(username=body['username']).first()
        validationB = User.query.filter_by(email=body['email']).first()
        if validationA != None or validationB != None:
            return jsonify({'message': 'This user already exists'}), 401
        else:
            hash_pass = genph(body['password'])
            user = User(username=body['username'], email=body['email'], password=hash_pass)
            db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'Success, registered user'}), 200

@app.route('/login', methods=['POST'])
def login():
    print(request.get_json())
    if len(request.get_json()) == 0:
        return jsonify({"message": "Enter you data."}), 401
    username = request.json.get('username')
    if username == None:
        return jsonify({"message": "Enter your user."}), 401
    password = request.json.get('password')
    if password == None:
        return jsonify({"message": "Enter your password."}), 401
    user = User.query.filter_by(username=username).first()
    if user == None:
        return jsonify({"message": "The username or password are incorrect."}), 401
    else:
        security = checkph(user.password, password)
        if security == False:
            return jsonify({"message": "The username or password are incorrect."}), 401
        else:
            access_token = create_access_token(identity=user.id)
            token = Token(id=user.id, token=access_token)
            db.session.add(token)
            db.session.commit()
            return jsonify(
                {
                    'message': 'Success '+user.username,
                    'token': access_token,
                    'user.id': user.id
                }
            ), 200

@app.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if current_user_id == None:
        token = Token.query.all()
    else:
        token = Token.query.get(user.id)
    db.session.delete(token)
    db.session.commit()

    return jsonify({'message': 'Finish session'}), 200

#private endpoint
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({'id': user.id, 'username': user.username}), 200


# esto solo se ejecuta si se ejecuta `$ python src/main.py`
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
