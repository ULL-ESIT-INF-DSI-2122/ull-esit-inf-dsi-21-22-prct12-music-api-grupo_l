import { Request, Response, Router } from 'express';
import Playlist from '../models/playlist';

/**
 * @class PlaylistRoutes Clase que implementa los métodos para operar sobre las playlist en la base de datos 
 */
class PlaylistRoutes {
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
   * @method getPlaylist método que crea un filtro de búsqueda mediante el nombre de una 
   * playlist gracias al método find() y devuelve los datos de la playlist en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getPlaylist(req: Request, res: Response) {
    const filter = req.query.nombrePlaylist ? { nombrePlaylist: req.query.nombrePlaylist.toString() } : {};

    Playlist.find(filter).then((playlists) => {
        if (playlists.length !== 0) {
            res.send(playlists);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    })
  }

  /**
   * @method getPlaylistById método que crea un filtro de búsqueda mediante el id de una 
   * playlisyt gracias al método findById() devuelve los datos de la playlist en caso de encontrarla.
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  getPlaylistById(req: Request, res: Response) {
    Playlist.findById(req.params.id).then((playlists) => {
        if (!playlists) {
            res.status(404).send();
        } else {
            res.send(playlists);
        }
    }).catch(() => {
        res.status(500).send();
    });
  }

  /**
   * @method postPlaylist método que añade una playlist a la base de datos mediante el método save
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  postPlaylist(req: Request, res: Response) {
    const playlist = new Playlist(req.body);
    playlist.save().then((playlists) => {
        res.status(201).send(playlists);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }

  /**
   * @method patchPlaylist método que permite actualizar una playlist buscandola y modificando su contenido
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  patchPlaylist(req: Request, res: Response) {
    if (!req.query.nombrePlaylist) {
        res.status(400).send({
            error: 'Se necesita nombre de la playlist',
        });
    } else {
        const allowedUpdates = ['nombrePlaylist', 'canciones', 'duracion', 'generos'];
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate =
            actualUpdates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            res.status(400).send({
                error: 'No se puede actualizar',
            });
        } else {
            Playlist.findOneAndUpdate({ nombrePlaylist: req.query.nombrePlaylist.toString() }, req.body, {
                new: true,
                runValidators: true,
            }).then((playlist) => {
                if (!playlist) {
                    res.status(404).send();
                } else {
                    res.send(playlist);
                }
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
    }
  }

  /**
   * @method patchPlaylistById método que permite actualizar una playlist buscandola por su id y modificando su contenido
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response
   */
  patchPlaylistById(req: Request, res: Response) {
    const allowedUpdates = ['nombrePlaylist', 'canciones', 'duracion', 'generos'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        res.status(400).send({
            error: 'No se puede actualizar',
        });
    } else {
        Playlist.findByIdAndUpdate({ _id: req.params.id.toString() }, req.body, {
            new: true,
            runValidators: true,
        }).then((playlist) => {
            if (!playlist) {
                res.status(404).send();
            } else {
                res.send(playlist);
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
  }

  /**
   * @method deletePlaylist método que permite borrar una playlist buscandola y borrandola
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response 
   */
  deletePlaylist(req: Request, res: Response) {
    if (!req.query.nombrePlaylist) {
        res.status(400).send({
            error: 'Se necesita nombre de la playlist',
        });
    } else {
        Playlist.findOneAndDelete({ nombrePlaylist: req.query.nombrePlaylist.toString() }).then((playlist) => {
            if (!playlist) {
                res.status(404).send();
            } else {
                res.send(playlist);
            }
        }).catch(() => {
            res.status(400).send();
        })
    }
  }

  /**
   * @method deletePlaylistById método que permite borrar una playlist buscandola por el idy borrandola
   * @param req parámetro que representa la request
   * @param res parámetro que representa la response 
   */
  deletePlaylistById(req: Request, res: Response) {
    Playlist.findByIdAndDelete({ _id: req.params.id }).then((playlist) => {
        if (!playlist) {
            res.status(404).send();
        } else {
            res.send(playlist);
        }
    }).catch(() => {
        res.status(400).send();
    })
  }

  routes() {
    this.router.get('/playlist', this.getPlaylist);
    this.router.get('/playlist/:id', this.getPlaylistById);
    this.router.post('/playlist', this.postPlaylist);
    this.router.patch('/playlist', this.patchPlaylist);
    this.router.patch('/playlist/:id', this.patchPlaylistById);
    this.router.delete('/playlist', this.deletePlaylist);
    this.router.delete('/playlist/:id', this.deletePlaylistById);
  }
}

const playlistRoutes = new PlaylistRoutes();
playlistRoutes.routes();
export default playlistRoutes.router;