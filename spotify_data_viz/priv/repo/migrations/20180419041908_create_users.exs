defmodule SpotifyDataViz.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :user_id, :string
      add :access_token, :string
      add :refresh_token, :string
      add :timestamp, :utc_datetime

      timestamps()
    end

  end
end
