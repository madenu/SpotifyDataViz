defmodule SpotifyDataVizWeb.AppChannel do
  use SpotifyDataVizWeb, :channel

  alias SpotifyDataViz.Utils

  # TODO authorize user
  def join("app:" <> _subtopic, _payload, socket) do
    app = Utils.new()

    socket =
      socket
      |> assign(:app, app)

    {:ok, app, socket}
  end

  def handle_in("album_mood", %{"albumID" => albumID, "token" => token}, socket) do
    app = Utils.albumMood(socket.assigns[:app], token, albumID)
    IO.inspect(app)
    socket = assign(socket, :app, app)
    {:reply, {:ok, %{"app" => app}}, socket}
  end

  def handle_in("track_analysis", %{"token" => token}, socket) do
    app = Utils.trackAnalysis(socket.assigns[:app], token)
    IO.inspect(app)
    socket = assign(socket, :app, app)
    {:reply, {:ok, %{"app" => app}}, socket}
  end
end
