defmodule SpotifyDataVizWeb.AppChannel do
  use SpotifyDataVizWeb, :channel

  alias SpotifyDataViz.Utils

  # TODO authorize user
  def join("app:" <> _subtopic, _payload, socket) do
    {:ok, %{}, socket}
  end

  def handle_in("album_mood", %{"albumID" => albumID, "token" => token}, socket) do
    album_mood = Utils.albumMood(token, albumID)
    broadcast(socket, "update_album_mood", album_mood)
    {:reply, {:ok, album_mood}, socket}
  end

  def handle_in("track_analysis", %{"token" => token}, socket) do
    track_analysis = Utils.trackAnalysis(token)
    broadcast(socket, "update_track_analysis", track_analysis)
    {:reply, {:ok, track_analysis}, socket}
  end
end
