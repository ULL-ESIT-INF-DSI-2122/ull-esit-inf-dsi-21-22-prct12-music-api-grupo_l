import { Request, Response, Router } from 'express';
import Artistas from '../models/artistas';


/**
 * @class ArtistaRoutes Clase que implementa los métodos para operar sobre las Artistas en la base de datos 
 */
class ArtistaRoutes {
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
   * @method getArtista método que crea un filtro de búsqueda mediante el nombre de un
   * artista gracias al método find() y devuelve los datos del artista en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getArtista(req: Request, res: Response) {
    const filter = req.query.nombreArtista ? { nombreArtista: req.query.nombreArtista.toString() } : {};

    Artistas.find(filter).then((artistas) => {
        if (artistas.length !== 0) {
            res.send(artistas);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    })
  }

  /**
   * @method getArtistaById método que crea un filtro de búsqueda mediante el id de una 
   * artista gracias al método findById() devuelve los datos de la artista en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getArtistaById(req: Request, res: Response) {
    Artistas.findById(req.params.id).then((artistas) => {
        if (!artistas) {
            res.status(404).send();
        } else {
            res.send(artistas);
        }
    }).catch(() => {
        res.status(500).send();
    });
  }

  /**
   * @method postArtista método que añade un artista a la base de datos mediante el método save
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  postArtista(req: Request, res: Response) {
    const artista = new Artistas(req.body);
    artista.save().then((artistas) => {
        res.status(201).send(artistas);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }

  /**
   * @method patchArtista método que permite actualizar un artista buscandola y modificando su contenido
   * @param req 
   * @param res 
   */
  patchArtista(req: Request, res: Response) {
    if (!req.query.nombreArtista) {
        res.status(400).send({
            error: 'Se necesita nombre del artista',
        });
    } else {
        const allowedUpdates = ['nombreArtista', 'grupos', 'generos', 'albumes', 'canciones', 'oyentes'];
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate =
            actualUpdates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            res.status(400).send({
                error: 'No se puede actualizar',
            });
        } else {
            Artistas.findOneAndUpdate({ nombreArtista: req.query.nombreArtista.toString() }, req.body, {
                new: true,
                runValidators: true,
            }).then((artista) => {
                if (!artista) {
                    res.status(404).send();
                } else {
                    res.send(artista);
                }
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
    }
  }

  /**
   * @method patchArtistaById método que permite actualizar un artista buscandola por su id y modificando su contenido
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  patchArtistaById(req: Request, res: Response) {
    const allowedUpdates = ['nombreArtista', 'grupos', 'generos', 'albumes', 'canciones', 'oyentes'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        res.status(400).send({
            error: 'No se puede actualizar',
        });
    } else {
        Artistas.findByIdAndUpdate({ _id: req.params.id.toString() }, req.body, {
            new: true,
            runValidators: true,
        }).then((artista) => {
            if (!artista) {
                res.status(404).send();
            } else {
                res.send(artista);
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
  }

  /**
   * @method deleteArtista método que permite borrar un artista buscandola y borrandola
   * @param req 
   * @param res 
   */
  deleteArtista(req: Request, res: Response) {
    if (!req.query.nombreArtista) {
        res.status(400).send({
            error: 'Se necesita nombre del artista',
        });
    } else {
        Artistas.findOneAndDelete({ nombreArtista: req.query.nombreArtista.toString() }).then((artista) => {
            if (!artista) {
                res.status(404).send();
            } else {
                res.send(artista);
            }
        }).catch(() => {
            res.status(400).send();
        })
    }
  }

  /**
   * @method deleteArtistaById método que permite borrar un artista buscandola por el idy borrandola
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response 
   */
  deleteArtistaById(req: Request, res: Response) {
    Artistas.findByIdAndDelete({ _id: req.params.id }).then((artista) => {
        if (!ArtistaRoutes) {
            res.status(404).send();
        } else {
            res.send(artista);
        }
    }).catch(() => {
        res.status(400).send();
    })
  }

  routes() {
    this.router.get('/artist', this.getArtista);
    this.router.get('/artist/:id', this.getArtistaById);
    this.router.post('/artist', this.postArtista);
    this.router.patch('/artist', this.patchArtista);
    this.router.patch('/artist/:id', this.patchArtistaById);
    this.router.delete('/artist', this.deleteArtista);
    this.router.delete('/artist/:id', this.deleteArtistaById);
  }
}

const artistaRoutes = new ArtistaRoutes();
artistaRoutes.routes();
export default artistaRoutes.router;