defmodule SpotifyDataViz.Utils do

  alias Spotify.{Client, Credentials, Album, Track}

  def new do
    %{
      album_mood: %{album_name: "DUNNO", album_tracks: ["MOMMA", "SAID", "KNOCUOUT"]},
      track_analysis: %{recent_tracks: ["ONE", "TWO", "THREE"]},
      user_token: nil
    }
  end

  def userToken(token) do
    %Credentials{access_token: token["spotify_access_token"], refresh_token: token["spotify_refresh_token"]}
  end

  def album_mood(state, token, album_id) do

    #create credential object for api requests
    conn = userToken(token)

    #pull album and tracks with api request
    {:ok, album} = Album.get_album(conn, album_id)
    {:ok, %{items: tracks}} = Album.get_album_tracks(conn, album_id)

    #create list of track ids for audio_features request
    track_ids = Enum.map(tracks, fn(k) -> k.id end)
                |> Enum.join(",")

    #pull audio features with api request
    {:ok, audio_features } = Track.audio_features(conn, ids: track_ids)

    #merge tracks + af (necessary as tracks and audio features are separate map arrays)
    tracks_af_combined = Enum.map(audio_features, fn(k) ->
      Map.merge(k, Enum.find(tracks, fn (x) -> x.id == k.id end)) end)

    #return state with updated album_mood from request
    %{
      album_mood: %{album_name: album.name, album_tracks: tracks_af_combined},
      track_analysis: state.track_analysis,
      user_token: state.user_token
    }

  end

  def recent_tracks(state, token) do

    IO.inspect("state is")
    IO.inspect(state)
    IO.inspect("token is")
    IO.inspect(token)

    authorization = [{"Authorization", "Bearer #{token["access_token"]}"}]

    url = "https://api.spotify.com/v1/me/player/recently-played"
    %{items: tracks} = HTTPoison.get(url, authorization)

    IO.inspect("tracks: ")
    IO.inspect(tracks)

    track_ids = Enum.map(tracks, fn(k) -> k.id end)
    track_names = Enum.map(tracks, fn(k) -> k.name end)

    combined_tracks = Enum.zip(track_names, track_ids)

    IO.inspect("track list: ")
    IO.inspect(combined_tracks)

    %{
      album_mood: state.album_mood,
      track_analysis: %{tracks: combined_tracks},
      user_token: state.user_token
    }

  end

  def get_track_features(state, token, track_id) do
    IO.inspect("state is")
    IO.inspect(state)
    IO.inspect("track_id is")
    IO.inspect(track_id)
    IO.inspect("token is")
    IO.inspect(token)

    authorization = [{"Authorization", "Bearer #{token["access_token"]}"}]
    audio_features_url = "https://api.spotify.com/v1/audio-features/#{track_id}"
    audio_features = HTTPoison.get(audio_features_url, authorization)

    IO.inspect("audio features is")
    IO.inspect(audio_features)

    dance = audio_features.danceability
    energy = audio_features.energy
    speech = audio_features.speechiness
    valence = audio_features.valence
    instrument = audio_features.instrumentalness
    features = %{danceability: dance, energy: energy, speechiness: speech, valence: valence, instrumentalness: instrument}

    %{
      album_mood: state.album_mood,
      track_analysis: %{state.track_analysis | features: features},
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