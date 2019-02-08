//Update node version (v8.11.2)
//Run: node index.js

const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const env = require('./.env.json');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'spotify';

const userToken = "" //Spotify Content
const playlist=[
  {person: "Paula", extroversion: 1}
]

const getClient = async () => {
  return await MongoClient.connect(url, { useNewUrlParser: true })
}

//Poblate the BBDD with playlists data from Spotify
const getPlayListInfo = async () => {
  const client = await getClient()
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const playLists = db.collection('playLists')
  //playLists.drop()

  let response
  for(let i=0; i<playlist.length; i++){
    try{
      response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.token
        }
      })
      console.log("response ok!", response.data)
    }catch(error){
      console.log("ERROR", error.request);
      client.close()
      return
    }

    const document = {genre: playlist[i].person, tracks: response.data.items, extroversion: playlist[i].extroversion, created_at: new Date() }

    for(let j=0; j < document.tracks.length ; j++){
      try{
        response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/audio-features/'+document.tracks[j].track.id,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + env.token
          }
        })
        console.log("response data ok!", response.data)
        document.tracks[j].info = response.data
      }catch(error){
        console.log("ERROR", error.request);
        client.close()
        return
      }
    }

    playLists.insertOne(document, {w: 1})
  }
  client.close()
}

getPlayListInfo()
