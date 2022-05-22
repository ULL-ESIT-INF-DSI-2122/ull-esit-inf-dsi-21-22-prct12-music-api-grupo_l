import { Request, Response, Router } from 'express';
import Cancion from '../models/cancion';

/**
 * @class CancionRoutes Clase que implementa los métodos para operar sobre las canciones en la base de datos 
 */
class CancionRoutes {
    /**
     * @constructor crea una propiedad de tipo Router para el uso de métodos para operar 
     * con la base de datos y se invoca al método que instancia dichas operaciones CRUD 
     */
  router: Router;
  constructor() {
      this.router = Router();
      this.routes();
  }

  /**
   * @method getCancion método que crea un filtro de búsqueda mediante el nombre de una 
   * canción gracias al método find() y devuelve los datos de la cancion en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getCancion(req: Request, res: Response) {
    const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};

    Cancion.find(filter).then((canciones) => {
        if (canciones.length !== 0) {
            res.send(canciones);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    })
  }

  /**
   * @method getCancionById método que crea un filtro de búsqueda mediante el id de una 
   * canción gracias al método findById() devuelve los datos de la cancion en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getCancionById(req: Request, res: Response) {
    Cancion.findById(req.params.id).then((canciones) => {
        if (!canciones) {
            res.status(404).send();
        } else {
            res.send(canciones);
        }
    }).catch(() => {
        res.status(500).send();
    });
  }
  
  /**
   * @method postCancion método que añade una canción a la base de datos mediante el método save
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  postCancion(req: Request, res: Response) {
    const cancion = new Cancion(req.body);
    cancion.save().then((canciones) => {
        res.status(201).send(canciones);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }

  /**
   * @method patchCancion método que permite actualizar una canción buscandola y modificando su contenido
   * @param req 
   * @param res 
   */
  patchCancion(req: Request, res: Response) {
    if (!req.query.nombre) {
        res.status(400).send({
            error: 'Se necesita nombre de la cancion',
        });
    } else {
        const allowedUpdates = ['nombre', 'autor', 'duracion', 'genero', 'single', 'numReproducciones'];
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate =
            actualUpdates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            res.status(400).send({
                error: 'No se puede actualizar',
            });
        } else {
            Cancion.findOneAndUpdate({ nombre: req.query.nombre.toString() }, req.body, {
                new: true,
                runValidators: true,
            }).then((cancion) => {
                if (!cancion) {
                    res.status(404).send();
                } else {
                    res.send(cancion);
                }
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
    }
  }

  /**
   * @method patchCancionById método que permite actualizar una cancion buscandola por su id y modificando su contenido
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  patchCancionById(req: Request, res: Response) {
    const allowedUpdates = ['nombre', 'autor', 'duracion', 'genero', 'single', 'numReproducciones'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        res.status(400).send({
            error: 'No se puede actualizar',
        });
    } else {
        Cancion.findByIdAndUpdate({ _id: req.params.id.toString() }, req.body, {
            new: true,
            runValidators: true,
        }).then((cancion) => {
            if (!cancion) {
                res.status(404).send();
            } else {
                res.send(cancion);
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
  }

  /**
   * @method deleteCancion método que permite borrar una canción buscandola y borrandola
   * @param req 
   * @param res 
   */
  deleteCancion(req: Request, res: Response) {
    if (!req.query.nombre) {
        res.status(400).send({
            error: 'Se necesita nombre de la cancion',
        });
    } else {
        Cancion.findOneAndDelete({ nombre: req.query.nombre.toString() }).then((cancion) => {
            if (!cancion) {
                res.status(404).send();
            } else {
                res.send(cancion);
            }
        }).catch(() => {
            res.status(400).send();
        })
    }
  }

  /**
   * @method deleteCancionById método que permite borrar una cancion buscandola por el idy borrandola
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response 
   */
  deleteCancionById(req: Request, res: Response) {
    Cancion.findByIdAndDelete({ _id: req.params.id }).then((cancion) => {
        if (!cancion) {
            res.status(404).send();
        } else {
            res.send(cancion);
        }
    }).catch(() => {
        res.status(400).send();
    })
  }

  routes() {
    this.router.get('/song', this.getCancion);
    this.router.get('/song/:id', this.getCancionById);
    this.router.post('/song', this.postCancion);
    this.router.patch('/song', this.patchCancion);
    this.router.patch('/song/:id', this.patchCancionById);
    this.router.delete('/song', this.deleteCancion);
    this.router.delete('/song/:id', this.deleteCancionById);
  }
}

const cancionRoutes = new CancionRoutes();
cancionRoutes.routes();
export default cancionRoutes.router;