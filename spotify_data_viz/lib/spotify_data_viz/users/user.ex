defmodule SpotifyDataViz.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :access_token, :string
    field :refresh_token, :string
    field :timestamp, :utc_datetime
    field :user_id, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:user_id, :access_token, :refresh_token, :timestamp])
    |> validate_required([:user_id, :access_token, :refresh_token, :timestamp])
  end
end
