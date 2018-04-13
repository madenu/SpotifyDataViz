defmodule SpotifyDataVizWeb.AppChannel do
  use SpotifyDataVizWeb, :channel

  # TODO cannot use app: alone without username because conflict
  # TODO authorize user

  def join("app:" <> _subtopic, _payload, socket) do
    {:ok,
     %{
       album_mood: %{album_name: "DUNNO", album_tracks: ["MOMMA", "SAID", "KNOCUOUT"]},
       track_analysis: %{recent_tracks: ["ONE", "TWO", "THREE"]}
     }, socket}
  end

  def handle_in(
        "album_mood:" <> _data,
        %{"albumName" => albumName},
        socket
      ) do
    state = %{}
    {:reply, {:ok, state}, socket}
  end

  def handle_in(
        "track_analysis:" <> _data,
        _params,
        socket
      ) do
    state = %{}
    {:reply, {:ok, state}, socket}
  end
end
