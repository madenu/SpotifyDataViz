# cs5610project2

## Requirements Checklist
* ~~Phoenix Elixir for non-trivial server-side logic~~
* ~~Use external API (Spotify)~~
* Use Postgres database (auth tokens or site log info)
* ~~Use a channel (i.e. a websocket) to pass data to/from server~~
* ~~Use React-Router to create a SPA~~
* ~~Use React to render the app~~
* ~~(Use Redux to control app state)~~
* ~~Use something not covered this semester (D3.js)~~
* Deploy to VPS with HTTPS
* Create a 2000-word report

## Useful Dev Things
```
{:ok, profile} = Spotify.Profile.me(conn)
{:ok, album} = Spotify.Album.get_album(conn, album_id)
{:ok, %{items: tracks}} = Spotify.Album.get_album_tracks(conn, album_id)
{:ok, audio_features } = Spotify.Track.audio_features(conn, ids: track_ids)
```

## TODO
* Plot a sample album mood
* Delete stuff associated with user token from redux state on server side
* Fix logout button
* Fix the redirect after authentication (the page is blank but Nav is there)
* Handle expired tokens:
```
[debug] INCOMING "album_mood" on "app:" to SpotifyDataVizWeb.AppChannel
  Transport:  Phoenix.Transports.WebSocket
  Parameters: %{"albumID" => "1WBZyULtlANBKed7Zf9cDP", "token" => %{"spotify_access_token" => "BQBaQ04gdTM_JnSsmDkXFdkpqIvNRmMKQ5I8InwYW4o0LW2CLzbQc9eB7bJ4ZnGJbe6QVVIFAaMBzll9SIY8H7eVCCxipSIsoGc96Q6vl7M448jrT3SuoU5a1XwBemBgrcbW6NEMPAS_Jp9lP2pbd1u0Q1BoA_5k3uM2ZAEUeIlMep3bkvrjJqwZLVNQKNhesxB8S0khuey5V6oqlnLDOZ9fhX3h1g", "spotify_refresh_token" => "AQAMwauxHwYdAUcL9UGN89YAs4DvYXABk60_sXhLNanuW8nkRfNXPBXx1eZE42_6LApttdqwmCAK7HR75YI2uBTeZXQOQk13PBGWTKCd13YErTjZZm0SdVL3TroZPV4iJkw"}}
[error] GenServer #PID<0.436.0> terminating
** (MatchError) no match of right hand side value: {:ok, %{"error" => %{"message" => "The access token expired", "status" => 401}}}
    (spotify_data_viz) lib/spotify_data_viz/spotify_utils.ex:18: SpotifyDataViz.Utils.albumMood/2
    (spotify_data_viz) lib/spotify_data_viz_web/channels/app_channel.ex:12: SpotifyDataVizWeb.AppChannel.handle_in/3
    (phoenix) lib/phoenix/channel/server.ex:244: anonymous fn/4 in Phoenix.Channel.Server.handle_info/2
    (spotify_data_viz) lib/spotify_data_viz_web/endpoint.ex:1: SpotifyDataVizWeb.Endpoint.instrument/4
    (stdlib) gen_server.erl:616: :gen_server.try_dispatch/4
    (stdlib) gen_server.erl:686: :gen_server.handle_msg/6
    (stdlib) proc_lib.erl:247: :proc_lib.init_p_do_apply/3
Last message: %Phoenix.Socket.Message{event: "album_mood", join_ref: "1", payload: %{"albumID" => "1WBZyULtlANBKed7Zf9cDP", "token" => %{"spotify_access_token" => "BQBaQ04gdTM_JnSsmDkXFdkpqIvNRmMKQ5I8InwYW4o0LW2CLzbQc9eB7bJ4ZnGJbe6QVVIFAaMBzll9SIY8H7eVCCxipSIsoGc96Q6vl7M448jrT3SuoU5a1XwBemBgrcbW6NEMPAS_Jp9lP2pbd1u0Q1BoA_5k3uM2ZAEUeIlMep3bkvrjJqwZLVNQKNhesxB8S0khuey5V6oqlnLDOZ9fhX3h1g", "spotify_refresh_token" => "AQAMwauxHwYdAUcL9UGN89YAs4DvYXABk60_sXhLNanuW8nkRfNXPBXx1eZE42_6LApttdqwmCAK7HR75YI2uBTeZXQOQk13PBGWTKCd13YErTjZZm0SdVL3TroZPV4iJkw"}}, ref: "2", topic: "app:"}
State: %Phoenix.Socket{assigns: %{}, channel: SpotifyDataVizWeb.AppChannel, channel_pid: #PID<0.436.0>, endpoint: SpotifyDataVizWeb.Endpoint, handler: SpotifyDataVizWeb.UserSocket, id: nil, join_ref: "1", joined: true, private: %{log_handle_in: :debug, log_join: :info}, pubsub_server: SpotifyDataViz.PubSub, ref: nil, serializer: Phoenix.Transports.V2.WebSocketSerializer, topic: "app:", transport: Phoenix.Transports.WebSocket, transport_name: :websocket, transport_pid: #PID<0.434.0>, vsn: "2.0.0"}
```
