defmodule SpotifyDataVizWeb.AppChannel do
  use SpotifyDataVizWeb, :channel

  alias SpotifyDataViz.Utils

  # TODO authorize user

  def join("app:" <> _subtopic, _payload, socket) do
    app = Utils.new()
    socket = socket
    |> assign(:app, app)
    #|> assign(:name, name)
    {:ok, app, socket}
  end

  def handle_in("album_mood", %{"albumID" => albumID, "token" => token}, socket) do
    app = Utils.album_mood(socket.assigns[:app], token, albumID)
    IO.inspect(app)
    socket = assign(socket, :app, app)
    {:reply, {:ok, %{ "app" => app}}, socket}
  end

  def handle_in("recent_tracks", %{"token" => token}, socket) do
    app = Utils.recent_tracks(socket.assigns[:app], token)
    IO.inspect(app)
    {:reply, {:ok, %{"app" => app}}, socket}
  end
end
