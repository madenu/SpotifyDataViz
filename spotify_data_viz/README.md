## Useful Dev Things
```
{:ok, profile} = Spotify.Profile.me(conn)
{:ok, album} = Spotify.Album.get_album(conn, album_id)
{:ok, %{items: tracks}} = Spotify.Album.get_album_tracks(conn, album_id)
{:ok, audio_features } = Spotify.Track.audio_features(conn, ids: track_ids)
```
## TODO
* Delete stuff associated with user token from redux state on server side
* Fix logout button
