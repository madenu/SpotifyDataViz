defmodule SpotifyDataVizWeb.AuthorizationView do
  use SpotifyDataVizWeb, :view

  def render("authorize.json", %{credentials: credentials}) do
    IO.inspect(credentials)
    credentials
  end
end
