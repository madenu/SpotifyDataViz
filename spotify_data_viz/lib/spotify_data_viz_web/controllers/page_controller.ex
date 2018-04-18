defmodule SpotifyDataVizWeb.PageController do
  use SpotifyDataVizWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", token: Spotify.Credentials.new(conn))
  end

  def authorize(conn, _params) do
    redirect(conn, external: Spotify.Authorization.url())
  end

  def authenticate(conn, params) do
    case Spotify.Authentication.authenticate(conn, params) do
      {:ok, conn} ->
        render(conn, "index.html", token: Spotify.Credentials.new(conn))

      {:error, reason, conn} ->
        redirect(conn, to: "/error")
    end
  end
end
