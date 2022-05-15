import {MongoClient} from 'mongodb';
import {CancionInterface} from './clases_bases/cancion';
import {ArtistasInterface} from './clases_bases/artistas';
import {PlaylistInterface} from './clases_bases/playlists';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'prueba';

interface NoteInterface {
  title: string,
  body: string,
  color: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

/*MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<CancionInterface>('canciones').insertOne({
    nombre: `Motomami`,
    autor: `Rosalía`,
    duracion: `2:32`,
    genero: [`Pop`],
    single: true,
    numReproducciones: 20000,
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});


MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<ArtistasInterface>('artistas').insertOne({
    nombre: `Motomami`,
    autor: `Rosalía`,
    duracion: `2:32`,
    genero: [`Pop`],
    single: true,
    numReproducciones: 20000,
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});


MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<PlaylistInterface>('playlist').insertOne({
    nombre: `Motomami`,
    autor: `Rosalía`,
    duracion: `2:32`,
    genero: [`Pop`],
    single: true,
    numReproducciones: 20000,
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});*/
