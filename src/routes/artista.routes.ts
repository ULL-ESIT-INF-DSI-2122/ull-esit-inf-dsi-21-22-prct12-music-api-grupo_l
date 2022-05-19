import { Request, Response, Router } from 'express';
import Artistas from '../models/artistas';

class ArtistaRoutes {
  router: Router;
  constructor() {
      this.router = Router();
      this.routes();
  }

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
  postArtista(req: Request, res: Response) {
    const artista = new Artistas(req.body);
    artista.save().then((artistas) => {
        res.status(201).send(artistas);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }
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
  routes() {
    this.router.get('/artist', this.getArtista);
    this.router.get('/artist/:id', this.getArtistaById);
    this.router.post('/artist', this.postArtista);
    this.router.patch('/artist', this.patchArtista);
    this.router.delete('/artist', this.deleteArtista);
  }
}

const artistaRoutes = new ArtistaRoutes();
artistaRoutes.routes();
export default artistaRoutes.router;