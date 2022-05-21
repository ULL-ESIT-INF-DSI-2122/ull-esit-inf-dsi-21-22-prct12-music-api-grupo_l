# Informe Práctica 12
TODO:
- Informe
- Video
- Collection del Thunder Client


# Informe Práctica 12 - API Node/Express de gestión de información musical

## Desarrollo de Sistemas Informáticos

## Componentes del grupo L

- Marcos Jesús Santana Ramos ([alu0101033471@ull.edu.es](alu0101033471@ull.edu.es))
- Héctor Abreu Acosta ([alu0101068855@ull.edu.es](alu0101068855@ull.edu.es))
- Marcos Padilla Herrera ([alu0101045177@ull.edu.es](alu0101045177@ull.edu.es))
- Andrea Calero Caro ([alu0101202952@ull.edu.es](alu0101202952@ull.edu.es))

## Herramientas para el Desarrollo de la Práctica.
Se ha hecho uso de una series de herramientas para complementar el desarrollo de la práctica para llevar a cabo una práctica más sólida y profesional.  
* **[Typedoc](https://typedoc.org/).**
TypeDoc es un generador de documentación mediante los propios comentarios del código.
![Documentacion generada con TypeDoc apartir de los comentarios](./assets/images/typedoc-example.PNG)  
* **[CoverAlls](https://coveralls.io/)**
Herramienta de análisis de encubrimiento del código.
![Página de Coveralls para el repositorio trabajado](./assets/images/coveralls-sample.PNG)
* **[GitHub Actions]()**
Servicio de GitHub para automatizar la ejecución de un flujo de trabajo mediante los commits que se hagan. Se hace uso de ``SonarCloud Workflow``, ``CoverAlls Workflow`` entre otros.  
![Muestra de distintos WorkFlows de GitHub Actions](./assets/images/GHActions-sample.PNG)



## Índice

- Estructura del proyecto
- Estructura del Servidor
- Modelos de la API:
    - Canción
    - Artista
    - Playlist
- Rutas de la API:
    - Índice de rutas
    - Rutas de los modelos
- Despliegue
    - MongoDB Atlas
    - Heroku
- Modo de uso
- Controles de calidad con Sonar Cloud
- Informe con Github Pages
- Conclusión


## Estructura del proyecto

Para el desarrollo de esta práctica se ha contado con un fichero que tendrá el servidor que procesará una conexión con **_MongoDB_** y 2 directorios:

Por un lado el directorio **models** que contiene 3 ficheros: **artistas.ts**, **cancion.ts** y **playlist.ts**, cada fichero tendrá una interfaz, esquema y modelo asociado, con la ayuda del Módulo **_Mongoose_** y sus respectivos validadores del paquete **_Validator_**. 

Por otro lado el directorio **routes** que contiene 4 ficheros: **artista.routes.ts**, **cancion.routes.ts**, **playlist.routes.ts** e **index.routes.ts**. En estos ficheros se dan definido las rutas en las que se podrán realizar peticiones. Para poder trabajar correctamente con la API, además se añadió un índice de rutas en el fichero **index.routes.ts** y se ha importado en el servidor.



## Estructura del Servidor

El fichero principal del proyecto es **server.ts**. Es el encargado de gestionar el funcionamiento el servidor en **_express_** sobre el que funcionará la API.

Para su implementación, se ha creado una clase Server, en la que se inicializa la aplicación.

El servidor cuenta con 4 funciones principales:
[x] Constructor
[x] Configure
[x] Routes
[x] Start


### Constructor
Se genera el objeto servidor, instancia la aplicación y llama a los métodos **configure()** y **routes()**, dejando el servidor a punto para poder ponerse en modo de escucha.

### Configure
Este método de configuración del servidor comienza creando una variable DATABASE en la que almacena la dirección de conexión de la base de datos local. A continuación, se inicializa la conexión a MongoDB mediante mongoose.

Mongoose hace uso de la variable de entorno **process.env.PORT** para seleccionar el puerto al que se conectará. Si esta variable no existe, se utiliza la ruta almacenada en la constante DATABASE por defecto.

Se establece una serie de propiedades para el uso de mongoose, y se muestra por consola si la conexión ha sido exitosa o no. Configura el puerto de escucha al almacenado en la variable de entorno PORT, o en su defecto, al puerto 3000.

Por último, se usaron algunos middlewares que utiliza el servidor. En este caso, son los siguientes:

- [**Morgan**](https://expressjs.com/en/resources/middleware/morgan.html): Genera un log básico cada vez que se recibe una petición, indicando el tipo, la ruta, el código de estado y el tiempo que tardó en ejecutarse.
- [**express.json**](https://es.acervolima.com/funcion-express-js-express-json/): Permite trabajar con formato json en las peticiones y respuestas, convirtiendo los datos.
- [**express.urlencoded**](https://es.acervolima.com/funcion-express-js-express-urlencoded/): Gestiona la codificación de las urls y los cuerpos de las peticiones.
- [**compression**](https://www.npmjs.com/package/compression): Minimiza el tamaño de las peticiones y respuestas.

### Routes
Se encarga de gestionar las rutas de la API que se alojan en el fichero **index.routes.ts**. En este caso, únicamente indica que se hace uso de las rutas almacenadas en el índice de rutas del servidor:

```typescript
this.app.use(apiRoutes);
```

### Start
Esta función se encarga de arrancar el servidor en modo de escucha. Para ello, utiliza el puerto almacenado anteriormente en la configuración.

## Modelos de la API

Los modelos de la API asociados a las canciones, artistas y playlists están alojados en el directorio **models** que contiene 3 ficheros: **cancion.ts**, **artistas.ts** y **playlist.ts** respectivamente. 

Cada fichero tendrá una interfaz, esquema y modelo asociado, con la ayuda del Módulo **_Mongoose_** y sus correspondientes validadores del paquete **_Validator_**. 

Con ello se respetan los principios básicos **SOLID**.

### Canción

El primer modelo que se va a analizar es el correspondiente a cancion.ts. La interfaz tendrá los atributos necesarios para definir una canción, un nombre de la canción, autor, duración, género, single (indica con un tipo boolean si es o no un sigle) y el número de reproducciones. Siguiendo una interfaz tal que:

```typescript
export interface CancionInterface{
  nombre: string,
  autor: string,
  duracion: string,
  genero: string[],
  single: boolean,
  numReproducciones: number
}
```

A continuación, estos serán desplegados en un Schema de mongoose. Dentro del Schema denotado por **CancionSchema** se asignarán los validadores correspondientes en caso de ser necesario. En el caso de canción, todos los atributos tienen validadores, excepto el nombre de la canción. Ya que la canción puede empezar por letra, número o incluso símbolo.

Sin embargo los que tienen validadores se puede observar que mediante **validate:** se comprueba que tiene que cumplir el atributo. Se expondrá la lógica de cada validador:

[x] **autor**: En el caso del autor se quiere que este string empiece por mayúsculas, ya que es un nombre propio.
[x] **duracion**: En el caso de la duración se quiere que el valor sea un string que cumpla la estructura siguiente "2:30" o "04:20". Para ello se definió la siguiente expresión regular:

```typescript
^([01]?[0-9]|2[0-3]):[0-5][0-9]$
```

[x] **genero**: Como género es un array de string lo que se quiere es recorrer ese array y comprobar que cada elemento de este (cada género) empiece con mayúsculas, como en el caso del autor.
[x] **single** y **numReproducciones**: La lógica de ambos validadores es similar pero adaptado a cada tipo de atributo. Este validador comprueba que el valor sea del tipo que se requiere, ejemplo: en el caso de single que sea un tipo boolean con **isBoolean()** y en el caso de numReproducciones que sea un tipo number con **isNumeric()**.

La mayoría de los validadores se reutilizan en atributos de las otras opciones (artistas.ts y playlist.ts).

Finalmente se define el modelo con Mongoose que se exportará de la canción con dicho esquema. Y se exportará para su posterior utilización.

```typescript
const Cancion = mongoose.model<CancionInterface>("Cancion", CancionSchema);
export default Cancion;
```



















## Referencias 

* **[Typedoc](https://typedoc.org/).**
TypeDoc es un generador de documentación mediante los propios comentarios del código.  

* **[Mocha](https://mochajs.org/)**
Framework para las pruebas creadas para el código.  

* **[Chai](https://www.chaijs.com/)**
Biblioteca de aserciones BDD / TDD para el nodo y el navegador que se puede combinar con cualquier marco de prueba de JavaScript.  

* **[Instanbul](https://istanbul.js.org/)**
Herramienta para el encubrimiento del código implementado.

* **[CoverAlls](https://coveralls.io/)**
Herramienta de análisis de encubrimiento del código.

* **[GitHub Actions](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_l/actions)**
Servicio de GitHub para automatizar la ejecución de un flujo de trabajo mediante los commits que se hagan. Se hace uso de ``SonarCloud Workflow``, ``CoverAlls Workflow`` entre otros.  

## Conclusiones
Al principio del desarrollo del proyecto, se ha utilizado la herramienta o extensión [Liveshare](https://docs.microsoft.com/es-es/visualstudio/liveshare/). Puesto a que nos surgieron varios errores a la hora de realizar nuevo código, ya que la versión de browser funcionaba mejor que la propia del Visual Studio Code. Por ello, descartamos el seguir usándola.

![Imagen liveshare](./assets/images/liveshare.png)

*Imagen de LiveShare*

El mayor problema surgió a la hora de realizar los writes de la base de datos, ya que nuestro código estaba estructurado de manera que las clases accedían entre ellas de tal manera que nos notificaba de un error de tipo cíclico.
```“TypeError: Converting circular structure to JSON” ```

Para solucionar el problema, se tuvo que modificar todo el código sobre las clases ya avanzadas para solventarlo. 

![Imagen guión práctica](./assets/images/guion.png)

Como podemos observar en la imagen anterior, en los apartados remarcados se pide información de la otra clase. En primera instancia, el atributo **autores** de nuestra clase álbum era del tipo Grupo o Artista, por lo que se tuvo que cambiar a tipo string o Artista, para así arreglar el error circular.

La práctica en si ha sido muy laboriosa, pero como parte positiva nombrar que el grupo aprendió nuevas características para este lenguaje de programación como fueron las herramientas **Inquirer** y **lowdb** para la creación de menús y bases de datos.
