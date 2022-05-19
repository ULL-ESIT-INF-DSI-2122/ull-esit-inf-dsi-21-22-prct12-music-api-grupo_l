import * as mongoose from "mongoose";
import validator from 'validator';
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
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre de la playlist debe comenzar con una letra mayúscula');
      }
    },
  },
  canciones: {
    type: [String],
    unique: false,
    required: true,
    validate: (value: string[]) => {
      value.forEach((element) => {
        if (!element.match(/^[A-Z]/)){
          throw new Error('El nombre de las canciones del artista debe comenzar con una letra mayúscula');
        }
      })
    },
  },
  duracion: {
    type: String,
    unique: false,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)) {
        throw new Error('El formato de la duración debe ser horas:minutos:segundos');
      }
    },
  },
  generos: {
    type: [String],
    unique: false,
    required: true,
    validate: (value: string[]) => {
      value.forEach((element) => {
        if (!element.match(/^[A-Z]/)){
          throw new Error('El nombre del género de la playlist debe comenzar con una letra mayúscula');
        }
      })
    },
  },
});

const Playlist = mongoose.model<CancionInterface>("Playlist", PlaylistSchema);
export default Playlist;