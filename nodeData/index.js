const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const env = require('./.env.json');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'spotify';

const userToken = "" //Spotify Content
const playlist=[
  {id: "6WYNqNsEts78M1yaJr0SGv", genre: "Rock"},
  {id: "6syz1K3D4TZnlBcJVP1U4n", genre: "Metal"},
  {id: "6Bfg6kZNU4KaD1XLgD4612", genre: "Classic"},
  {id: "6Yf8HAYCcwQBAPoWcfDExi", genre: "Blues"},
  {id: "6usfsoTlryyLNuLlaDJwN0", genre: "Country"},
  {id: "3eGHqo88sq4YPebPHFtUdE", genre: "Disco"},
  {id: "7Ed0cpV3uU46zY7wGxlZPX", genre: "Hip-hop"},
  {id: "07BrxGYAQKgKlzBJoiLswk", genre: "Jazz"},
  {id: "2kC4eB6Wok9kSRxRidKues", genre: "Pop"},
  {id: "3vsoCGPfNcIgdbeORjO22S", genre: "Reggae"}
]


const getClient = async () => {
  return await MongoClient.connect(url, { useNewUrlParser: true })
}

const getPlayListInfo = async () => {
  const client = await getClient()
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const playLists = db.collection('playLists')
  playLists.drop()

  let response
  for(let i=0; i<playlist.length; i++){
    try{
      response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/playlists/'+playlist[i].id+'?market=ES&fields=tracks.items(track(name%2Chref))',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.token
        }
      })
      console.log("response!", response.data.tracks)
    }catch(error){
      console.log("ERROR", error.request);
      return
    }

    const document = {genre: playlist[i].genre, tracks: response.data.tracks.items, created_at: new Date() }
    playLists.insertOne(document, {w: 1})
  }

  client.close()
}

getPlayListInfo()
return

//TODO: Get info of this track
const getTrackInfo = (genre, spotifyId) => {

}