import * as mongoose from "mongoose";
import validator from 'validator';
import {CancionInterface} from './cancion';
/**
 * TRABAJO GRUPO L
 * @class Artistas contiene las especificaciones de los
 * distintos artistas
 * @param nombreArtista nombre del artista
 * @param grupos array de Grupos 
 * @param generos array de string
 * @param albumes array de Album
 * @param canciones array de Cancion
 * @param oyentes número de oyentes 
 */
/**
 * Interfaz ArtistasInterface
 */
 export interface ArtistasInterface {
	nombreArtista: string,
	generos: string[],
	canciones: CancionInterface[],
	oyentes: number;
}

const ArtistaSchema = new mongoose.Schema({
  nombreArtista: {
    type: String,
    unique: true,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del artista debe comenzar con una letra mayúscula');
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
          throw new Error('El nombre del género del artista debe comenzar con una letra mayúscula');
        }
      })
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
  oyentes: {
    type: Number,
    unique: false,
    required: true,
    validate: (value: number) => {
      if (!validator.isNumeric(`${value}`)) {
        throw new Error('El formato de oyentes debe ser del tipo number');
      }
    },
  },
});

const Artistas = mongoose.model<ArtistasInterface>("Artista", ArtistaSchema);
export default Artistas;