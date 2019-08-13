# Pruebas de aceptación con Cypress para inicio de sesión en Selfcare b2b

## Introducción

Para comprender y utilizar de forma correcta esta documentación se deben tener conocimientos básicos de Cypress por lo cual es necesario que a la par de esta información se consulte la [Documentación de Cypress](https://docs.cypress.io/).


Adicionalmente en este repositorio existe un ejemplo completo y real el cual le puede servir de guía y de base. Este ejemplo se puede probar sin problema alguno, ya que se basa en la url publica.


## Instalación

Para inicializar el entorno de deben instalar los siguientes paquetes como dependencias de desarrollo:

    `npm i -D cypress, cypress-cucumber-preprocessor, mocha, mochawesome, mochawesome-merge`

*Nota:* La ubicación de la instalación puede ser fuera del proyecto o dentro de este.


Lo siguiente es ejecutar en la consola el comando `npx cypress open` esto crear la estructura de Cypress y abrirá la aplicación de Cypress que esta creada en Electron.

## Configuración

Se debe editar el archivo `package.json` y agregarle los siguientes scripts:

```
  "scripts": {
    "cy:run": "npx cypress run",
    "cy:open": "npx cypress open",
    "cleanup": "rm -fr docs",
    "merge_reports": "npx mochawesome-merge --reportDir docs > docs/index.json",
    "generate_mochawesome_report": "npx marge --charts --code=false -o=docs  docs/index.json",
    "cy:report": "npm run cleanup; npm run cy:run; npm run merge_reports; npm run generate_mochawesome_report"
  },
```
Esto define los comandos de npm a utilizar.

* En la raíz del proyecto se debe ubicar el archivo `cypress.json` al cual se debe agregar lo siguiente:

```
{
    "baseUrl": "http://selfcare.dev.co",
    "ignoreTestFiles": "*.js",
    "viewportHeight": 768,
    "viewportWidth": 1024,
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "./docs",
      "reportName": "Pruebas de Aceptación de Nuevo satck Mi Cuenta Tigo",
      "reportTitle": "Pruebas de Aceptación de Nuevo satck Mi Cuenta Tigo",
      "overwrite": false,
      "html": false,
      "json": true
    },
    "chromeWebSecurity": false
}
```

Esto define la configuración Cypress para el proyecto.

* En la carpeta `cypress/plugins` se encuentra un archivo `index.js` el cual hay que editar colocando este código luego de los comentarios:

```
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber());
}
```

Con esto se activa el plugins de Cucumber.

* En la carpeta `cypress/support` se encuentra el archivo `index.js` el cual hay que editar y agregar los siguiente:

```
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
```
Esto evita que Excepcions detengan la ejecución de las pruebas.

* •	Se debe elimina la carpeta `example` y su contenido que se encuentran en la carpeta `cypress/integration`.

También es importante mencionar que se generan screenshots y videos que por defecto se guardan en la carpeta `cypress` bajo directorios separados con los nombres de `screenshots` y `videos` y que esa ubicación se puede cambiar en la configuración. Más [información](https://docs.cypress.io/guides/guides/screenshots-and-videos.html#Screenshots)
