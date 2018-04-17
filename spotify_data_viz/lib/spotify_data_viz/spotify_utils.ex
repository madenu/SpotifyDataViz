defmodule SpotifyDataViz.Utils do

  def new do
    %{
      album_mood: %{album_name: "DUNNO", album_tracks: ["MOMMA", "SAID", "KNOCUOUT"]},
      track_analysis: %{recent_tracks: ["ONE", "TWO", "THREE"]},
      user_token: nil
    }
  end

  def album_mood(state, token, album_id) do

    IO.inspect("state is")
    IO.inspect(state)
    IO.inspect("album_id is")
    IO.inspect(album_id)
    IO.inspect("token is")
    IO.inspect(token)

    authorization = [{"Authorization", "Bearer #{token["spotify_access_token"]}"}]

    album_url = "https://api.spotify.com/v1/albums/#{album_id}"
    {:ok, album} = HTTPoison.get(album_url, authorization)

    IO.inspect("album is")
    IO.inspect(album)

    tracks_url = "https://api.spotify.com/v1/albums/#{album_id}/tracks"
    {:ok, %{items: tracks}} = HTTPoison.get(tracks_url, authorization)

    IO.inspect("tracks is")
    IO.inspect(tracks)

    track_ids = Enum.map(tracks, fn(k) -> k.id end)
                |> Enum.join(",")

    audio_features_url = "https://api.spotify.com/v1/audio-features" <> URI.encode_query(%{ids: track_ids})
    {:ok, audio_features} = HTTPoison.get(audio_features_url, authorization)

    IO.inspect("audio features is")
    IO.inspect(audio_features)

    #necessary as tracks and audio features are separate map arrays
    tracks_af_combined = Enum.map(audio_features, fn(k) ->
      Map.merge(k, Enum.find(tracks, fn (x) -> x.id == k.id end)) end)

    #necessary as artist is an embedded list within album
    #artist = Map.get(Enum.fetch!(album.artists,0), "name")

    %{
      album_mood: %{album_name: album.name, album_tracks: tracks_af_combined},
      track_analysis: state.track_analysis,
      user_token: state.user_token
    }

  end

#  album_id = "1WBZyULtlANBKed7Zf9cDP"
#
#  {:ok, profile} = Spotify.Profile.me(conn)
#  {:ok, album} = Spotify.Album.get_album(conn, album_id)
#  {:ok, %{items: tracks}} = Spotify.Album.get_album_tracks(conn, album_id)
#
#  track_ids = Enum.map(tracks, fn(k) -> k.id end)
#              |> Enum.join(",")
#
#  {:ok, audio_features } = Spotify.Track.audio_features(conn, ids: track_ids)
#
#  #necessary as tracks and audio features are separate map arrays
#  tracks_af_combined = Enum.map(audio_features, fn(k) ->
#    Map.merge(k, Enum.find(tracks, fn (x) -> x.id == k.id end)) end)
#
#  #necessary as artist is an embedded list within album
#  artist = Map.get(Enum.fetch!(album.artists,0), "name")
#
#  render conn, "profile.html", profile: profile, artist: artist, album: album,
#                               tracks: tracks_af_combined

end