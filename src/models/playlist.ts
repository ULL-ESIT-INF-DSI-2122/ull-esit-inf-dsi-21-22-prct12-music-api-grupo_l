import * as mongoose from "mongoose";
import {CancionInterface} from './cancion';

/**
 * TRABAJO GRUPO L
 * @class Cancion contiene las especificaciones de las
 * distintas canciones
 * @param nombrePlaylist nombre de la Playlist
 * @param canciones array de Cancion 
 * @param duracion duración de la canción
 * @param genero genero de la canción
 */

/**
 * Interfaz PlaylistInterface
 */
 export interface PlaylistInterface {
	nombrePlaylist: string;
	canciones: CancionInterface[];
	duracion: string;
	generos: string[];
}

const PlaylistSchema = new mongoose.Schema({
  nombrePlaylist: {
    type: String,
    unique: true,
    required: true,
  },
  canciones: {
    type: [String],
    unique: false,
    required: true,
  },
  duracion: {
    type: String,
    unique: false,
    required: true,
  },
  generos: {
    type: [String],
    unique: false,
    required: true,
  },
});

const Playlist = mongoose.model<CancionInterface>("Playlist", PlaylistSchema);
export default Playlist;