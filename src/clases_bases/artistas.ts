import { Cancion, CancionInterface } from "./cancion";

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
/**
 * Clase Artistas
 */
export class Artistas {
	private nombreArtista: string;
	private generos: string[] = [];
	private canciones: Cancion[] = [];
	private oyentes: number;

	constructor(nombreArtista: string){
		this.nombreArtista = nombreArtista;
	}
	/**
/**
	 * @function construirArtista Método para inicializar las propiedades restantes de
	 * la clase Artista
	 * @param canciones canciones del artista
	 * @param oyentes oyentes del artista
	 */
	construirArtista(canciones: Cancion[], oyentes: number){
	
		this.canciones = canciones;
		this.setOyentes(oyentes);
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
	}
	/**
	 * Getter del nombre del artista
	 * @returns nombre del artista
	 */
	getNombreArtista(){
		return this.nombreArtista;
	}

	


	/**
	 * Getter de los géneros musicales 
	 * @returns géneros musicales
	 */
   getGenero(){
    return this.generos;
}



	 

	/**
	 * Getter de los nombres de las canciones del artista
	 * @returns canciones del artista
	 */
	getCanciones(){
		let canciones_: string[] = [];
    this.canciones.forEach(element => {
      canciones_.push(element.getNombreCancion());
    }); 
		return canciones_;
	}

	/**
	 * Getter de las canciones del artista
	 * @returns canciones del artista
	 */
		getCancionesObject(){
		let canciones_: Cancion[] = [];
		this.canciones.forEach(element => {
			canciones_.push(element);
		}); 
		return canciones_;
	}

	/**
	 * Getter del número de oyentes del artista
	 * @returns oyentes del artista
	 */
	getOyentes(){
		return this.oyentes;
	}


	/**
	 * Setter del nombre del artista
	 * @param nombre del artista
	 */
	setNombreArtista(nombre: string){
		this.nombreArtista = nombre;
	}




	/**
	 * Setter del genero del artista
	 * @param genero del artista
	 */
	setGeneros(genero: string[]){
		this.generos = [];
    this.generos = genero;
	}

	/**
	 * Setter de las canciones del artista
	 * @param cancion del artista
	 */
	setCanciones(cancion: Cancion[]){
	this.canciones = [];
		this.canciones = cancion;
	}

	/**
	 * Setter de los oyentes 
	 * @param oyentes mensuales
	 */
	setOyentes(oyentes: number) {
		this.oyentes = oyentes;
	}
}