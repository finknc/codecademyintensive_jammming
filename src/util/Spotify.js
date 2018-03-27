const clientId = '6769a07882f043dcb71142a379cea2c7'; //The client ID oif the app
const redirectUri = 'http://localhost:3000/'; //The whitelisted return uri

let token; //The access token will be stored in this variable
let expiration; //The expiration date witll be stored in this variable


function getUrlParameter(name) {
    var regex = new RegExp(name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : results[1];
};

//The following object holds the methods for communicating with Spotify
const Spotify = {
  /**
   * Gets the access token we need to use the Spotify API
   * @return {str} The access token
   */
  getToken() {
    // Check if both the token and the expiration variables are set
    if (token && expiration) {
      /*
       If the token and expiration is set we check so see if the token is
       still valid
       */
      const currentDate = new Date().getTime();
      if (currentDate < expiration)
      {
        return token;
      }
    }

    // Check if the url contains the access token and the expiration in seconds
    token = getUrlParameter('access_token');
    const expiresIn = getUrlParameter('expires_in');

    /*
     If the access token and the expiration in seconds was obtained then we
     calculate the expiration date, otherwise, we call the Spotify API to
     retrive a new token
     */
    if (token && expiresIn) {
      expiration = new Date().getTime() + parseInt(expiresIn, 10) * 1000;
    }
    else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location = authorizeUrl;
    }
    return token;
  },

  /**
   * Search for tracks in Spotify
   * @param {str} term The search term0
   * @return {Promise} A promise containing the resulting tracks in an array
   */
  search: function(term) {
    const accessToken = Spotify.getToken();

    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) {
        /*
         We return the tracks in the json data as an array of objects with
         information about each track
         */
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name,
          title: track.name,
          uri: track.uri
        }));
      }
    });
  },

  /**
   * Save the playlist to the user's Spotify Playlists
   * @param {str} playlistName The name of the playlist
   * @param {array} tracks The tracks to save to the playlist
   * @return {Promise} A promise returning a boolean indicating whether or not the request was a success
   */
  savePlaylist: function(playlistName, tracks) {
    // Check if a playlist name and at least one track has been provided
    if (!playlistName || !tracks.length || tracks.length === 0) {
      // We return a promise that returns false so it can be handled externally
      return new Promise(function(resolve, reject){
        resolve(false);
      }).then(response => response);
    }
    const accessToken = Spotify.getToken();

    // First we call the api to get id of the user that is logged in
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonUserResponse => {
      // The next step is to create the playlist for the user
      return fetch(`https://api.spotify.com/v1/users/${jsonUserResponse.id}/playlists`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName })
      }).then(response => response.json()).then(jsonPlaylistResponse => {
        // The last step is to add the tracks to the newly created playlist
        return fetch(`https://api.spotify.com/v1/users/${jsonUserResponse.id}/playlists/${jsonPlaylistResponse.id}/tracks`,{
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: tracks.map(track => track.uri) })
        }).then(response => true);
      });
    });
  }
}

export default Spotify; // Export the Spotify object as default
