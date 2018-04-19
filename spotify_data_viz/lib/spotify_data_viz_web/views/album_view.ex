defmodule SpotifyDataVizWeb.AlbumView do
  use SpotifyDataVizWeb, :view
  alias SpotifyDataVizWeb.AlbumView

  def render("index.json", %{albums: albums}) do
    %{data: render_many(albums, AlbumView, "album.json")}
  end

  def render("show.json", %{album: album}) do
    %{data: render_one(album, AlbumView, "album.json")}
  end

  def render("album.json", %{album: album}) do
    %{id: album.id,
      album_id: album.album_id,
      album_name: album.album_name,
      artist_name: album.artist_name,
      times_searched: album.times_searched}
  end
end
