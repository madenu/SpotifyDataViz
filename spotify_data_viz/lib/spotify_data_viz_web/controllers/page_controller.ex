defmodule SpotifyDataVizWeb.PageController do
  use SpotifyDataVizWeb, :controller

  alias SpotifyDataViz.SoSpotifyDB
  alias SpotifyDataViz.Users

  def logout(conn, _params) do
    conn
    |> Plug.Conn.delete_resp_cookie("spotify_refresh_token")
    |> Plug.Conn.delete_resp_cookie("spotify_access_token")
    |> render("index.html", token: %{refresh_token: "", access_token: ""}, user: 0)
  end

  def index(conn, _params) do
    profileID =
      case Spotify.Profile.me(conn) do
        {:ok, %{"error" => _msg_dict}} ->
          0

        {:ok, profile} ->
          profile.id
      end

    render(conn, "index.html", token: Spotify.Credentials.new(conn), user: profileID)
  end

  def authorize(conn, _params) do
    redirect(conn, external: Spotify.Authorization.url())
  end

  def authenticate(conn, params) do
    case Spotify.Authentication.authenticate(conn, params) do
      {:ok, conn} ->
        updateToken(conn)
        redirect(conn, to: "/")

      {:error, _reason, conn} ->
        redirect(conn, to: "/error")
    end
  end

  def updateToken(conn) do
    token = Spotify.Credentials.new(conn)
    current_user = Users.get_user_by_id(profileID(conn))

    if current_user do
      IO.inspect("Updating user with new token")

      Users.update_user(current_user, %{
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        timestamp: DateTime.utc_now()
      })
    else
      IO.inspect("Creating user with new token")

      Users.create_user(%{
        user_id: profileID(conn),
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        timestamp: DateTime.utc_now()
      })
    end
  end

  def profileID(conn) do
    {:ok, profile} = Spotify.Profile.me(conn)
    profile.id
  end
end
