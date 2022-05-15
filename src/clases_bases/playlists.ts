import { Cancion } from "./cancion";

/**
 * Interfaz PlaylistInterface
 */
 export interface PlaylistInterface {
	nombrePlaylist: string;
	canciones: Cancion[];
	duracion: string;
	generos: string[];
}
/**
 * @class Playlist Clase que representa una Playlist de varias canciones de distintos géneros.
 */
export class Playlist {
	private nombrePlaylist: string;
	private canciones: Cancion[];
	private duracion: string;
	private generos: string[] = [];
	
	/**
	 * 
	 * @param nombrePlaylist Nombre que se le añadirá a la Playlist
	 * @param canciones Conjunto de canciones que serán reproducidas en la playlist
	 */
	constructor(nombrePlaylist: string, canciones: Cancion[]){
		this.nombrePlaylist = nombrePlaylist;
		this.canciones = canciones;
		//this.duracion = ``;
		let auxGeneroCanciones: string[];
		this.canciones.forEach(element => {
			
			auxGeneroCanciones = element.getGenero();
			auxGeneroCanciones.forEach(elemento => {
				let contador: number = 0;
				for(let i = 0; i < this.generos.length; i++){
					if (elemento === this.generos[i]){
						contador++;
					}
				}
				if (contador === 0){
					this.generos.push(elemento);					
					contador = 0;
				}	
				contador = 0;
			});
		});
		let aux: number = 0;
		this.canciones.forEach(element => {
			aux = aux + element.getDuracionCancionSecs()
		});
		let hour = Math.floor(aux / 3600);
		let min = Math.floor(aux / 60);
		let secs = aux - min * 60;
		aux = aux - hour * 3600;
		let result: string = `${hour}h ${min}min ${secs}secs`;
		this.duracion = result;
	}
	/**
	 * Getter para el nombre de la Playlist
	 * @returns string con el nombre de la playlist
	 */
	getNombrePlaylist(){
		return this.nombrePlaylist;
	}

	/**
	 * Getter para el Conjunto de canciones
	 * @returns Array de Canciones
	 */
	getCanciones(){
		return this.canciones;
	}
	/**
	 * Getter para el Conjunto de canciones
	 * @returns Array de Canciones
	 */
	 getCancionesNombre(){
		 let auxNombre:string[] = [];
		 this.canciones.forEach(element =>{
			 auxNombre.push(element.getNombreCancion())
		 })
		return auxNombre;
	}

	/**
	 * Getter para la duración de una Cancion
	 * @returns String con la duración de la playlist en formato HH:MM:SS
	 */
	getDuracion(){
		let aux: number = 0;
		this.canciones.forEach(element => {
			aux = aux + element.getDuracionCancionSecs()
		});
		let hour = Math.floor(aux / 3600);
		let min = Math.floor(aux / 60);
		let secs = aux - min * 60;
		aux = aux - hour * 3600;
		let result: string = `${hour}h ${min}min ${secs}secs`;
		this.duracion = result;

		return this.duracion;
	}

	/**
	 * Getter para el conjunto de Generos 
	 * @returns Array de Generos Musicales
	 */
	getGeneros(){
    return this.generos;
	}

	/**
	 * Setter para añadir el nombre de la playlist
	 * @param nombre Nuevo nombre de la playlist 
	 */
	setNombrePlaylist(nombre: string){
		this.nombrePlaylist = nombre;
	}

	/**
	 * Setter para añadir un conjunto de Canciones de la Playlist
	 * @param canciones Conjunto de canciones a añadir
	 */
	setCanciones(canciones: Cancion[]){
		this.canciones = [];
		this.canciones = canciones;
	}
/**
 * Setter para añadir la duración de la playlist
 * @param duracion Nuevo string con el valor de la duracion de la playlist
 */
	setDuracion(duracion: string){
		this.duracion = duracion;
	}

	/**
	 * Setter para añadir el conjunto de GenerosMusicales
	 * @param generos Conjunto de generos a añadir.
	 */
	setGeneros(generos: string[]){
		this.generos = [];
		this.generos = generos;
	}
}