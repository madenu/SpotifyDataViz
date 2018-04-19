defmodule SpotifyDataViz.Utils do
  alias Spotify.{Credentials, Album, Track, Search}
  alias SpotifyDataViz.SoSpotifyDB

  def userToken(token) do
    %Credentials{
      access_token: token["spotify_access_token"],
      refresh_token: token["spotify_refresh_token"]
    }
  end

  def updateAlbumsDB(album_id, album) do
    album_record = SoSpotifyDB.get_album_by_id(album_id)
    artist = Map.get(Enum.fetch!(album.artists, 0), "name")

    if album_record do
      SoSpotifyDB.update_album(album_record, %{times_searched: album_record.times_searched + 1})
    else
      SoSpotifyDB.create_album(%{
        album_id: album_id,
        album_name: album.name,
        artist_name: artist,
        times_searched: 1
      })
    end
  end

  def combine([], [], _max_tempo), do: []

  def combine(tracks, features, max_tempo) do
    [track | tracks] = tracks
    [feature | features] = features
    first = %{name: track.name, valence: feature.valence, tempo: feature.tempo / max_tempo}
    [first | combine(tracks, features, max_tempo)]
  end

  def normalizeCombine(tracks, features) do
    max_tempo_feat = Enum.max_by(features, fn feat -> feat.tempo end)
    max_tempo = max_tempo_feat.tempo
    combine(tracks, features, max_tempo)
  end

  def albumMood(token, album_id) do
    # create credential object for api requests
    credentials = userToken(token)

    {:ok, album} = Album.get_album(credentials, album_id)
    {:ok, %{items: tracks}} = Album.get_album_tracks(credentials, album_id)

    {:ok, audio_features} =
      Track.audio_features(
        credentials,
        ids: tracks |> Enum.map(fn track -> track.id end) |> Enum.join(",")
      )

    updateAlbumsDB(album_id, album)

    tracks_af_combined = normalizeCombine(tracks, audio_features)
    %{album_name: album.name, album_tracks: tracks_af_combined}
  end

  def helpGetArtistStrings([]), do: ""

  def helpGetArtistStrings(artists) do
    [first | rest] = artists
    ", " <> first["name"] <> helpGetArtistStrings(rest)
  end

  def getArtistStrings([]), do: ""

  def getArtistStrings(artists) do
    [first | rest] = artists
    first["name"] <> helpGetArtistStrings(rest)
  end

  def albumSearch(token, album_name) do
    # create credential object for api requests
    credentials = userToken(token)
    # pull search results with api request
    {:ok, %{items: albums}} = Search.query(credentials, q: album_name, type: "album")
    # return a list of {name, id} tuples
    Enum.map(albums, fn album ->
      %{name: album.name, artists: getArtistStrings(album.artists), id: album.id}
    end)
  end

  def trackAnalysis(token) do
    # create credential object for api requests
    credentials = userToken(token)

    # pull users recent tracks
    url = "https://api.spotify.com/v1/me/player/recently-played"
    query = HTTPoison.get(url, [{"Authorization", "Bearer #{token["spotify_access_token"]}"}])
    {:ok, %HTTPoison.Response{status_code: _code, body: body}} = query

    tracks = Poison.decode!(body)["items"]

    # create list of track ids for audio_features request
    track_ids =
      Enum.map(tracks, fn k -> k["track"]["id"] end)
      |> Enum.join(",")

    # to create track objects using spotify_ex (since not returned as track objects from recently played pull)
    {:ok, tracks} = Track.get_tracks(credentials, ids: track_ids)

    # pull audio features with api request
    {:ok, audio_features} = Track.audio_features(credentials, ids: track_ids)

    # necessary as tracks and audio features are separate map arrays
    tracks_af_combined =
      Enum.map(audio_features, fn k ->
        Map.merge(k, Enum.find(tracks, fn x -> x.id == k.id end))
      end)

    recents =
      Enum.map(tracks_af_combined, fn t ->
        %{
          name: t.name,
          id: t.id,
          features: %{
            dance: t.danceability,
            energy: t.energy,
            instrumentalness: t.instrumentalness,
            speechiness: t.speechiness,
            valence: t.valence
          }
        }
      end)

    %{recent_tracks: recents}
  end
end
