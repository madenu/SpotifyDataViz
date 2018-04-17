defmodule SpotifyDataVizWeb.AuthorizationController do
  use SpotifyDataVizWeb, :controller

  def authorize(conn, _params) do
    redirect conn, external: Spotify.Authorization.url
    #render(conn, "authorize.json", credentials: Spotify.Credentials.new(conn))
  end
end
