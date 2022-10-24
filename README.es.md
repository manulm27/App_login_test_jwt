# Plantilla de aplicación web con React JS y Flask API

[![Abrir en gidpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/react-flask-hello.git)

> Documentacion: https://start.4geeksacademy.com/

<p align="center">
<a href="https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b"><img src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/ how-to.png?raw=true?raw=true" /></a>
</p>

- React.js front-end y python/flask backend para su aplicación web.
- Amplia documentación [here](https://start.4geeksacademy.com/).
- Integrado con Pipenv para la gestión de paquetes.
- Implementación rápida en heroku [en solo unos pocos pasos aquí] (https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Uso del archivo .env.
- Integración de SQLAlchemy para la abstracción de la base de datos.

### Styles

Puede actualizar `styles/index.css` o crear nuevos archivos `.css` dentro de `styles/` e importarlos a sus archivos css o js actuales según sus necesidades.

### Components

Agregue más archivos a su carpeta `./src/js/components` o estilos según los necesite e impórtelos a sus archivos actuales según sea necesario.

💡Nota: hay un ejemplo que usa la API de contexto dentro de `views/demo.js`;

### Views (Components)

Agregue más archivos a su `./src/js/views` e impórtelos en `./src/js/layout.jsx`.

### Context

Este modelo viene con una API de contexto general centralizada. El archivo `./src/js/store/flux.js` tiene una estructura base para la tienda, te animamos a cambiarla y adaptarla a tus necesidades.

Contexto de reacción [docs](https://reactjs.org/docs/context.html)
Lección de BreathCode [ver](https://content.breatheco.de/lesson/react-hooks-explained)

El 'Proveedor' ya está configurado. Puede consumir desde cualquier componente usando el enlace useContext para obtener la `tienda` y las `acciones` del Contexto. Consulte `/views/demo.js` para ver una demostración.

```jsx
import { Context } from "../store/appContext";
const MyComponentSuper = () => {
    //aquí usas useContext para obtener la tienda y las acciones
    const { store, actions } = useContext(Context);
    return <div>{/* puedes usar tus acciones o almacenar dentro del html */}</div>;
};
```

### Instalación manual de back-end:

Se recomienda instalar primero el backend, asegúrese de tener Python 3.8, Pipenv y un motor de base de datos (se recomienda Posgress)

1. Instale los paquetes de python: `$ pipenv install`
2. Cree un archivo .env basado en .env.example: `$ cp .env.example .env`
3. Instale su motor de base de datos y cree su base de datos, dependiendo de su base de datos, debe crear una variable DATABASE_URL con uno de los valores posibles, asegúrese de reemplazar los valores con la información de su base de datos:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migre las migraciones: `$ pipenv run migrate` (omita si no ha realizado cambios en los modelos en `./src/api/models.py`)
5. Ejecute las migraciones: `$ pipenv run upgrade`
6. Ejecute la aplicación: `$ pipenv run start`

### Usuarios de tabla de relleno de backend

Para insertar usuarios de prueba en la base de datos ejecute el siguiente comando:

```sh
$ flask insert-test-users 5
```

Y verás el siguiente mensaje:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

Para actualizar con todas sus tablas, puede editar el archivo app.py e ir a la línea 80 para insertar el código para completar otras tablas.

### Front-End Manual Installation:

- Asegúrese de que está utilizando la versión de nodo 14+ y que ya instaló y ejecutó correctamente el backend.

1. Instale los paquetes: `$ npm install`
2. ¡Empieza a codificar! inicie el servidor de desarrollo webpack `$ npm run start`

## Publish your website!

Este modelo está 100 % integrado con Herkou, [siga este tutorial] (https://start.4geeksacademy.com/backend/deploy-heroku-posgres) y con solo enviar sus cambios al repositorio de heroku se implementará el sitio web después.
