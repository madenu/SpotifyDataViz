defmodule SpotifyDataVizWeb.AlbumControllerTest do
  use SpotifyDataVizWeb.ConnCase

  alias SpotifyDataViz.SoSpotifyDB
  alias SpotifyDataViz.SoSpotifyDB.Album

  @create_attrs %{album_id: "some album_id", album_name: "some album_name", artist_name: "some artist_name", times_searched: 42}
  @update_attrs %{album_id: "some updated album_id", album_name: "some updated album_name", artist_name: "some updated artist_name", times_searched: 43}
  @invalid_attrs %{album_id: nil, album_name: nil, artist_name: nil, times_searched: nil}

  def fixture(:album) do
    {:ok, album} = SoSpotifyDB.create_album(@create_attrs)
    album
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all albums", %{conn: conn} do
      conn = get conn, album_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create album" do
    test "renders album when data is valid", %{conn: conn} do
      conn = post conn, album_path(conn, :create), album: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, album_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "album_id" => "some album_id",
        "album_name" => "some album_name",
        "artist_name" => "some artist_name",
        "times_searched" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, album_path(conn, :create), album: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update album" do
    setup [:create_album]

    test "renders album when data is valid", %{conn: conn, album: %Album{id: id} = album} do
      conn = put conn, album_path(conn, :update, album), album: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, album_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "album_id" => "some updated album_id",
        "album_name" => "some updated album_name",
        "artist_name" => "some updated artist_name",
        "times_searched" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, album: album} do
      conn = put conn, album_path(conn, :update, album), album: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete album" do
    setup [:create_album]

    test "deletes chosen album", %{conn: conn, album: album} do
      conn = delete conn, album_path(conn, :delete, album)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, album_path(conn, :show, album)
      end
    end
  end

  defp create_album(_) do
    album = fixture(:album)
    {:ok, album: album}
  end
end
