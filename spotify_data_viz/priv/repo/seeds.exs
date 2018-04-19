# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SpotifyDataViz.Repo.insert!(%SpotifyDataViz.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias SpotifyDataViz.Repo
  alias SpotifyDataViz.SoSpotifyDB.Album

  def run do

    Repo.delete_all(Album)
    Repo.insert!(%Album{ album_id: "0sNOF9WDwhWunNAHPD3Baj", album_name: "She's So Unusual",
      artist_name: "Cyndi Lauper", times_searched: 1 })
    Repo.insert!(%Album{ album_id: "41MnTivkwTO3UUJ8DrqEJJ", album_name: "The Best Of Keane (Deluxe Edition)",
      artist_name: "Keane", times_searched: 7 })

  end
end

Seeds.run
