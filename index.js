const axios = require('axios');

const userToken = "" //Spotify Content
const playlist=[
  "6WYNqNsEts78M1yaJr0SGv", //Rock
  //TODO: Complete this list
]

//TODO: Complete this loop
axios({
  method: 'get',
  url: 'https://api.spotify.com/v1/playlists/'+playlist[0]+'?market=ES&fields=tracks.items(track(name%2Chref))',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+userToken
  }
},)
.then(response => {
  console.log(response, response.data);
  //Get each track and gendre

})
.catch(error => {
  console.log(error);
});


//TODO: Get info of this track
const getTrackInfo = (gendre, spotifyId) => {

}
