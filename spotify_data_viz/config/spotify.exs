use Mix.Config

config :spotify_ex, user_id: "1296736342",
                    scopes: ["playlist-read-private"],
                    callback_url: "http://localhost:4000/"