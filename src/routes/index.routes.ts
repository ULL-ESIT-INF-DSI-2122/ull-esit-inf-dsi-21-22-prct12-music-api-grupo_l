import {Request, Response, Router} from 'express'
import cancionRoutes from './cancion.routes'
import artistaRoutes from './artista.routes'
import playlistRoutes from './playlist.routes'

/**
 * Enrutador principal
 */
class ApiRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req, res) => {
            res.send("Para usar la API situate en: /song /artist /playlist");
        })
        this.router.use(cancionRoutes);
        this.router.use(artistaRoutes);
        this.router.use(playlistRoutes);
    }
}

const apiRoutes = new ApiRoutes();
apiRoutes.routes();
export default apiRoutes.router;