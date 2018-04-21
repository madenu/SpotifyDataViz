use Mix.Config

config :spotify_ex, user_id: "1296736342",
                    scopes: ["playlist-read-private", "playlist-modify-private", "playlist-modify-public","user-top-read", "user-read-recently-played"],
                    callback_url: "https://spotifydataviz.davidcelentano.club/authenticate"
