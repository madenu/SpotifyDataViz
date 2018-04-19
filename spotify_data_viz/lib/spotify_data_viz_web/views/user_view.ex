defmodule SpotifyDataVizWeb.UserView do
  use SpotifyDataVizWeb, :view
  alias SpotifyDataVizWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      user_id: user.user_id,
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      timestamp: user.timestamp}
  end
end
