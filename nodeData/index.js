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
  //TODO: Complete this list
]


const getClient = async () => {
  return await MongoClient.connect(url, { useNewUrlParser: true })
}

const getPlayListInfo = async () => {
  const client = await getClient()
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const playLists = db.collection('playLists')

  let i =0
  let response
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

  client.close()
}

getPlayListInfo()
return
