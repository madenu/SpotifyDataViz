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

  def handle_in(
        "track_analysis:" <> _data,
        _params,
        socket
      ) do
    state = %{}
    {:reply, {:ok, state}, socket}
  end
end
