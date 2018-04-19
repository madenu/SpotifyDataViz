defmodule SpotifyDataVizWeb.AlbumController do
  use SpotifyDataVizWeb, :controller

  alias SpotifyDataViz.SoSpotifyDB
  alias SpotifyDataViz.SoSpotifyDB.Album

  action_fallback SpotifyDataVizWeb.FallbackController

  def index(conn, _params) do
    albums = SoSpotifyDB.list_albums()
    render(conn, "index.json", albums: albums)
  end

  def create(conn, %{"album" => album_params}) do
    with {:ok, %Album{} = album} <- SoSpotifyDB.create_album(album_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", album_path(conn, :show, album))
      |> render("show.json", album: album)
    end
  end

  def show(conn, %{"id" => id}) do
    album = SoSpotifyDB.get_album!(id)
    render(conn, "show.json", album: album)
  end

  def update(conn, %{"id" => id, "album" => album_params}) do
    album = SoSpotifyDB.get_album!(id)

    with {:ok, %Album{} = album} <- SoSpotifyDB.update_album(album, album_params) do
      render(conn, "show.json", album: album)
    end
  end

  def delete(conn, %{"id" => id}) do
    album = SoSpotifyDB.get_album!(id)
    with {:ok, %Album{}} <- SoSpotifyDB.delete_album(album) do
      send_resp(conn, :no_content, "")
    end
  end
end
