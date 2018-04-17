defmodule SpotifyDataVizWeb.AuthenticationController do
  use SpotifyDataVizWeb, :controller

  def authenticate(conn, params) do
    case Spotify.Authentication.authenticate(conn, params) do
      {:ok, conn} ->
        redirect(conn, to: "/")

      {:error, reason, conn} ->
        redirect(conn, to: "/error")
    end
  end
end
