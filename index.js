const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const env = require('./.env.json');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'spotify';

const userToken = "" //Spotify Content
const playlist=[
  {id: "6WYNqNsEts78M1yaJr0SGv", gendre: "Rock"},
  //TODO: Complete this list
]

//TODO: Complete this loop
let i = 0
axios({
  method: 'get',
  url: 'https://api.spotify.com/v1/playlists/'+playlist[i].id+'?market=ES&fields=tracks.items(track(name%2Chref))',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + env.token
  }
},)
.then(response => {
  console.log("response!", response.data.tracks);
  //Get each track and gendre
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    console.log("Connected successfully to server")

    const db = client.db(dbName)

    const playLists = db.collection('playLists')

    const document = {gendre: playlist[i].gendre, tracks: response.data.tracks.items}
    playLists.insert(document, {w: 1}, function(err, records){
      console.log("Record added as ",records)
    });

    client.close()
  })
})
.catch(error => {
  console.log("ERROR!",error.response);
});


//TODO: Get info of this track
const getTrackInfo = (gendre, spotifyId) => {

}
