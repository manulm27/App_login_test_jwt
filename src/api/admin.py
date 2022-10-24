
import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')


    # Agregue sus modelos aquí, por ejemplo, así es como agregamos un modelo de usuario al administrador
    admin.add_view(ModelView(User, db.session))

    # Puede duplicar esa línea para agregar nuevos modelos
    # admin.add_view(Model View(Your Model Name, db.session))