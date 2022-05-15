import * as mongoose from "mongoose";

/**
 * TRABAJO GRUPO L
 * @class Cancion contiene las especificaciones de las
 * distintas canciones
 * @param nombre nombre de la canción
 * @param autor nombre del autor de la canción 
 * @param duracion duración de la canción
 * @param genero genero de la canción
 * @param single boolean si es single o no
 * @param numReproducciones número de reproducciones de la canción
 */

 export interface CancionInterface{
  nombre: string,
  autor: string,
  duracion: string,
  genero: string[],
  single: boolean,
  numReproducciones: number
}

const CancionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
  },
  autor: {
    type: String,
    unique: false,
    required: true,
  },
  duracion: {
    type: String,
    unique: false,
    required: true,
  },
  genero: {
    type: [String],
    unique: false,
    required: true,
  },
  single: {
    type: Boolean,
    unique: false,
    required: true,
  },
  numReproducciones: {
    type: Number,
    unique: false,
    required: true,
  },
});

const Cancion = mongoose.model<CancionInterface>("Cancion", CancionSchema);
export default Cancion;


/*export class Cancionn{
  constructor(private nombre: string, private autor: string, private duracion: string, 
  private genero: string[], private single: boolean, private numReproducciones: number){
  }

  }
  */