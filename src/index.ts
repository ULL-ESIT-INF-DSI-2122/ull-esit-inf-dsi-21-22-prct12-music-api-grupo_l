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
    "nombre": "SongName",
    "autor": "AuthorName",
    "duracion": "1:32",
    "genero": ["Pop"],
    "single": true,
    "numReproducciones": 20000,
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
    "nombreArtista": "ArtistName",
    "generos": ["Pop"],
    "canciones": ["Song3", "Song4"],
    "oyentes": 1000
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
    "nombrePlaylist": "PlaylistName",
    "canciones": ["Song1", "Song2"],
    "duracion": "2:30",
    "generos": ["Pop", "Rock"]
});
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});*/
