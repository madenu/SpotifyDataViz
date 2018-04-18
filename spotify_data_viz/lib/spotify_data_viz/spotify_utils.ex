defmodule SpotifyDataViz.Utils do

  alias Spotify.{Client, Credentials, Album, Track}
  import Helpers

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

  def albumMood(state, token, album_id) do

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

  def trackAnalysis(state, token) do
    conn = userToken(token)

    #pull users recent tracks
    url = "https://api.spotify.com/v1/me/player/recently-played"
    query = HTTPoison.get(url, [{"Authorization", "Bearer #{token["spotify_access_token"]}"}])
    {:ok, %HTTPoison.Response{status_code: _code, body: body}} = query

    tracks = Poison.decode!(body)["items"]

    #create list of track ids for audio_features request
    track_ids = Enum.map(tracks, fn(k) -> k["track"]["id"] end)
                |> Enum.join(",")

    #to create track objects using spotify_ex (since not returned as track objects from recently played pull)
    {:ok, tracks} = Track.get_tracks(conn, ids: track_ids)

    #pull audio features with api request
    {:ok, audio_features } = Track.audio_features(conn, ids: track_ids)

    #necessary as tracks and audio features are separate map arrays
    tracks_af_combined = Enum.map(audio_features, fn(k) ->
      Map.merge(k, Enum.find(tracks, fn (x) -> x.id == k.id end)) end)

    recents = Enum.map(tracks_af_combined, fn(t) ->
      %{name: t.name, id: t.id, features: %{dance: t.danceability, energy: t.energy, instrumentalness: t.instrumentalness, speechiness: t.speechiness, valence: t.valence}} end)

    #return state with updated album_mood from request
    %{
      album_mood: state.album_mood,
      track_analysis: %{recent_tracks: recents},
      user_token: state.user_token
    }
  end

end