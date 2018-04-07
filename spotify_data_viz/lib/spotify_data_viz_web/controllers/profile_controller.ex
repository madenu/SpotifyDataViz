defmodule SpotifyDataVizWeb.ProfileController do
  use SpotifyDataVizWeb, :controller
  #plug SpotifyDataVizWeb.Plugs.Auth

  def index(conn, _params) do
    {:ok, profile} = Spotify.Profile.me(conn)


    render conn, "profile.html", profile: profile
  end

end