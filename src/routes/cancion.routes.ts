import { Request, Response, Router } from 'express';
import Cancion from '../models/cancion';

class CancionRoutes {
  router: Router;
  constructor() {
      this.router = Router();
      this.routes();
  }

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
  postCancion(req: Request, res: Response) {
    const cancion = new Cancion(req.body);
    cancion.save().then((canciones) => {
        res.status(201).send(canciones);
    }).catch((error: Error) => {
        res.status(400).send(error);
    });
  }
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
  routes() {
    this.router.get('/song', this.getCancion);
    this.router.get('/song/:id', this.getCancionById);
    this.router.post('/song', this.postCancion);
    this.router.patch('/song', this.patchCancion);
    this.router.delete('/song', this.deleteCancion);
  }
}

const cancionRoutes = new CancionRoutes();
cancionRoutes.routes();
export default cancionRoutes.router;