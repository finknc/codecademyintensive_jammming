const clientId = '6769a07882f043dcb71142a379cea2c7';
const redirectUri = 'http://localhost:3000/';

let token;
let expiration;

function getUrlParameter(name) {
    var regex = new RegExp(name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : results[1];
};

const Spotify = {
  getToken() {
    if (token && expiration) {
      const currentDate = new Date().getTime();
      if (currentDate < expiration)
      {
        return token;
      }
    }
    token = getUrlParameter('access_token');
    const expiresIn = getUrlParameter('expires_in');

    if (token && expiresIn) {
      expiration = new Date().getTime() + parseInt(expiresIn, 10) * 1000;
    }
    else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location = authorizeUrl;
    }
    return token;
  },

  search: function(term) {
    const accessToken = Spotify.getToken();

    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          artist: track.artists[0].name,
          album: track.album.name,
          title: track.name
        }));
      }
    });
  },

  savePlaylist: function(playlistName, tracks) {
    if (!playlistName || !tracks || tracks.length === 0) {
      return new Promise(function(resolve, reject){
        resolve(false);
      }).then(response => response);
    }
    const accessToken = Spotify.getToken();

    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonUserResponse => {
      return fetch(`https://api.spotify.com/v1/users/${jsonUserResponse.id}/playlists`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName })
      }).then(response => response.json()).then(jsonPlaylistResponse => {
        const tracksUris = tracks.map(track => `spotify:track:${track.id}`);
        return fetch(`https://api.spotify.com/v1/users/${jsonUserResponse.id}/playlists/${jsonPlaylistResponse.id}/tracks`,{
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: tracksUris })
        }).then(response => true);
      });
    });
  }
}

export default Spotify;
