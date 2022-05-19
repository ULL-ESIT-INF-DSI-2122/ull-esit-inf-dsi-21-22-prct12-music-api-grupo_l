import { Request, Response, Router } from 'express';
import Playlist from '../models/playlist';

class PlaylistRoutes {
  router: Router;
  constructor() {
      this.router = Router();
      this.routes();
  }

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
  postPlaylist(req: Request, res: Response) {
    const playlist = new Playlist(req.body);
    playlist.save().then((playlists) => {
        res.status(201).send(playlists);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }
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