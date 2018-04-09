defmodule SpotifyDataVizWeb.ProfileController do
  use SpotifyDataVizWeb, :controller
  #plug SpotifyDataVizWeb.Plugs.Auth

  def index(conn, _params) do
    album_id = "1WBZyULtlANBKed7Zf9cDP"

    {:ok, profile} = Spotify.Profile.me(conn)
    {:ok, album} = Spotify.Album.get_album(conn, album_id)
    {:ok, %{items: tracks}} = Spotify.Album.get_album_tracks(conn, album_id)

    track_ids = Enum.map(tracks, fn(k) -> k.id end)
                |> Enum.join(",")

    {:ok, audio_features } = Spotify.Track.audio_features(conn, ids: track_ids)

    #necessary as tracks and audio features are separate map arrays
    tracks_af_combined = Enum.map(audio_features, fn(k) ->
      Map.merge(k, Enum.find(tracks, fn (x) -> x.id == k.id end)) end)

    #necessary as artist is an embedded list within album
    artist = Map.get(Enum.fetch!(album.artists,0), "name")

    render conn, "profile.html", profile: profile, artist: artist, album: album,
                                 tracks: tracks_af_combined
  end

end