defmodule SpotifyDataVizWeb.Router do
  use SpotifyDataVizWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", SpotifyDataVizWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    get("/album_mood", PageController, :index)
    get("/track_analysis", PageController, :index)

    get("/authorize", PageController, :authorize)
    get("/authenticate", PageController, :authenticate)
  end

  # Other scopes may use custom stacks.
  # scope "/api/v1/", SpotifyDataVizWeb do
  #  pipe_through(:api)
  # end
end
