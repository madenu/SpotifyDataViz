defmodule SpotifyDataVizWeb.AppChannel do
  use SpotifyDataVizWeb, :channel

  alias SpotifyDataViz.Utils

  # TODO authorize user
  def join("app:" <> _subtopic, _payload, socket) do
    {:ok, %{}, socket}
  end

  def handle_in("album_mood", %{"albumID" => albumID, "token" => token}, socket) do
    album_mood = Utils.albumMood(token, albumID)
    {:reply, {:ok, album_mood}, socket}
  end

  def handle_in("track_analysis", %{"token" => token}, socket) do
    track_analysis = Utils.trackAnalysis(token)
    {:reply, {:ok, track_analysis}, socket}
  end
end
