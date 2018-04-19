defmodule SpotifyDataViz.SoSpotifyDBTest do
  use SpotifyDataViz.DataCase

  alias SpotifyDataViz.SoSpotifyDB

  describe "albums" do
    alias SpotifyDataViz.SoSpotifyDB.Album

    @valid_attrs %{album_id: "some album_id", album_name: "some album_name", artist_name: "some artist_name", times_searched: 42}
    @update_attrs %{album_id: "some updated album_id", album_name: "some updated album_name", artist_name: "some updated artist_name", times_searched: 43}
    @invalid_attrs %{album_id: nil, album_name: nil, artist_name: nil, times_searched: nil}

    def album_fixture(attrs \\ %{}) do
      {:ok, album} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SoSpotifyDB.create_album()

      album
    end

    test "list_albums/0 returns all albums" do
      album = album_fixture()
      assert SoSpotifyDB.list_albums() == [album]
    end

    test "get_album!/1 returns the album with given id" do
      album = album_fixture()
      assert SoSpotifyDB.get_album!(album.id) == album
    end

    test "create_album/1 with valid data creates a album" do
      assert {:ok, %Album{} = album} = SoSpotifyDB.create_album(@valid_attrs)
      assert album.album_id == "some album_id"
      assert album.album_name == "some album_name"
      assert album.artist_name == "some artist_name"
      assert album.times_searched == 42
    end

    test "create_album/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SoSpotifyDB.create_album(@invalid_attrs)
    end

    test "update_album/2 with valid data updates the album" do
      album = album_fixture()
      assert {:ok, album} = SoSpotifyDB.update_album(album, @update_attrs)
      assert %Album{} = album
      assert album.album_id == "some updated album_id"
      assert album.album_name == "some updated album_name"
      assert album.artist_name == "some updated artist_name"
      assert album.times_searched == 43
    end

    test "update_album/2 with invalid data returns error changeset" do
      album = album_fixture()
      assert {:error, %Ecto.Changeset{}} = SoSpotifyDB.update_album(album, @invalid_attrs)
      assert album == SoSpotifyDB.get_album!(album.id)
    end

    test "delete_album/1 deletes the album" do
      album = album_fixture()
      assert {:ok, %Album{}} = SoSpotifyDB.delete_album(album)
      assert_raise Ecto.NoResultsError, fn -> SoSpotifyDB.get_album!(album.id) end
    end

    test "change_album/1 returns a album changeset" do
      album = album_fixture()
      assert %Ecto.Changeset{} = SoSpotifyDB.change_album(album)
    end
  end
end
