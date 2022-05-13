

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
export class Cancion{
    constructor(private nombre: string, private autor: string, private duracion: string, 
    private genero: string[], private single: boolean, private numReproducciones: number){
    }

    /**
     * Getter del nombre de la canción
     * @returns nombre de la canción
     */
    getNombreCancion(){
        return this.nombre;
    }

    /**
     * Getter del autor de la canción
     * @returns autor de la canción
     */
    getAutorCancion(){
        return this.autor;
    }

    /**
     * Getter de la duración de la canción
     * @returns duración de la canción
     */
    getDuracionCancion(){
        return this.duracion;
    }
    /**
     * Getter de la duración de la canción en segundos 
     * @returns segundos de la duración en Number
     */
    getDuracionCancionSecs(){
        let auxm: string = this.duracion.slice(0, this.duracion.search(':'));
        let auxs: string = this.duracion.slice(this.duracion.search(":") + 1, this.duracion.length);
        return (Number(auxs) + Number(auxm) * 60);
    }

    getGenero(){
        return this.genero;
    }

    /**
     * Getter de si una canción es un single o no
     * @returns si es un single o no
     */
    getSingle(){
        return this.single;
    }

    /**
     * Getter número de reproducciones de una canción
     * @returns número de reproducciones de una canción
     */
    getNumReproducciones(){
        return this.numReproducciones;
    }

    /**
     * Setter del nombre de la canción
     * @param nombre de la canción
     */
    setNombreCancion(nombre: string){
        this.nombre = nombre;
    }

    /**
     * Setter del nombre del autor de la canción
     * @param autor de la canción
     */
    setAutorCancion(autor: string){
        this.autor = autor;
    }

    /**
     * Setter de la duración de la canción
     * @param duracion de la canción
     */
    setDuracionCancion(duracion: string){
        this.duracion = duracion;
    }

    /**
     * Setter de los géneros musicales
     * @param genero array de generos musicales
     */
    setGeneroMusical(genero: string[]){
       this.genero = [];
        this.genero = genero;
    }

    /**
     * Setter de si la canción es un single o no
     * @param single o no
     */
    setSingle(single: boolean){
        this.single = single;
    }

    /**
     * Setter del número de reproducciones de una canción
     * @param reproducciones de una canción
     */
    setNumReproducciones(reproducciones: number){
        this.numReproducciones = reproducciones;
    }

    public static deserialize(cancion: Cancion[]){
        const myCanciones: Cancion[] = [];
    
        cancion.forEach((element) => {
            const myCancion = new Cancion(element.getNombreCancion(), element.getAutorCancion(), element.getDuracionCancion(),
            element.getGenero(), element.getSingle(), element.getNumReproducciones());
            //myCancion.setGeneroMusical([]);
            myCanciones.push(myCancion);
        });
    
        return myCanciones;
    }
    }