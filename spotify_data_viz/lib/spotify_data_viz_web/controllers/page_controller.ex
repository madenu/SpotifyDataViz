defmodule SpotifyDataVizWeb.PageController do
  use SpotifyDataVizWeb, :controller

  def index(conn, _params) do
    render conn, "index.html", token: Spotify.Credentials.new(conn)
  end
end
