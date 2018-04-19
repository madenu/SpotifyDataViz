defmodule SpotifyDataViz.Repo.Migrations.CreateAlbums do
  use Ecto.Migration

  def change do
    create table(:albums) do
      add :album_id, :string
      add :album_name, :string
      add :artist_name, :string
      add :times_searched, :integer

      timestamps()
    end

  end
end
