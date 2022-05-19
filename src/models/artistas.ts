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
  },
  generos: {
    type: [String],
    unique: false,
    required: true,
  },
  canciones: {
    type: [String],
    unique: false,
    required: true,
  },
  oyentes: {
    type: Number,
    unique: false,
    required: true,
  },
});

const Artistas = mongoose.model<ArtistasInterface>("Artista", ArtistaSchema);
export default Artistas;