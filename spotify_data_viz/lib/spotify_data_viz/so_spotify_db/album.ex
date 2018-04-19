defmodule SpotifyDataViz.SoSpotifyDB.Album do
  use Ecto.Schema
  import Ecto.Changeset


  schema "albums" do
    field :album_id, :string
    field :album_name, :string
    field :artist_name, :string
    field :times_searched, :integer

    timestamps()
  end

  @doc false
  def changeset(album, attrs) do
    album
    |> cast(attrs, [:album_id, :album_name, :artist_name, :times_searched])
    |> validate_required([:album_id, :album_name, :artist_name, :times_searched])
  end
end
