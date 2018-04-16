defmodule SpotifyDataVizWeb.AuthorizationController do
  use SpotifyDataVizWeb, :controller

  def authorize(conn, _params) do
    render(conn, "authorize.json", credentials: Spotify.Credentials.new(conn))
  end
end
