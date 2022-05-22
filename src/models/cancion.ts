import * as mongoose from "mongoose";
import validator from 'validator';
/**
 * TRABAJO GRUPO L
 * @interface CancionInterface contiene las especificaciones de las
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
/**
 * Esquema de Canciones (CancionSchema).
 * @method mongoose.Schema() Método que crea un esquema.
 * @param nombre nombre de la canción .
 * @param autor autorde una cancion que comprueba que empieze por mayuscula y solo contenga letras o numeros.
 * @param duracion duración de la cancion.
 * @param genero generos de la cancion.
 * @param single boolean que comprueba si la cancion fue un single o no.
 * @param numReproducciones numero de reproducciones que ha tenido la cancion.
 */
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
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del autor debe comenzar con una letra mayúscula');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El nombre del autor no debe contener un caracter no alfanumérico');
      }
    },
  },
  duracion: {
    type: String,
    unique: false,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
        throw new Error('El formato de la duración debe ser minutos:segundos');
      }
    },
  },
  genero: {
    type: [String],
    unique: false,
    required: true,
    validate: (value: string[]) => {
      value.forEach((element) => {
        if (!element.match(/^[A-Z]/)){
          throw new Error('El nombre del género de la canción debe comenzar con una letra mayúscula');
        }
      })
    },
  },
  single: {
    type: Boolean,
    unique: false,
    required: true,
    validate: (value: boolean) => {
      if (!validator.isBoolean(`${value}`)) {
        throw new Error('El formato de single debe ser del tipo boolean');
      }
    },
  },
  numReproducciones: {
    type: Number,
    unique: false,
    required: true,
    validate: (value: number) => {
      if (!validator.isNumeric(`${value}`)) {
        throw new Error('El formato de numReproducciones debe ser del tipo number');
      }
    },
  },
});

const Cancion = mongoose.model<CancionInterface>("Cancion", CancionSchema);
export default Cancion;
