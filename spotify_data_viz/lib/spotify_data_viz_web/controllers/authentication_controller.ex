defmodule SpotifyDataVizWeb.AuthenticationController do
  use SpotifyDataVizWeb, :controller


  def authenticate(conn, params) do

    code = %{"code" => "AQCbBWzhAMheCDS75YXcgejCMkSBWYedJenCBc9dN_tn-xtGo9eeHErzPkKN7-WJw3Yk39GywiB5bTlxCpIDXk8ssZajGlJfSyI2RcN5HarQO3InpSO80DxsJRn-bHylKUV58ETO6UujrQ7ElzE37m1sFEp3Afh3v623Ozi0TTYozYdQN_8keO0jpcsrOaA3hmDqKak5Ma0E33CPDOvyOb8JQPc44jlETND9Pwa_al148Q5aNIsDq61Efy9Qy5kWvYx5Gf9LOUg-1gtlNqcDfer2hBYQ20jjadVI1qhpmm-rRw"}

    case Spotify.Authentication.authenticate(conn, code) do
      {:ok, conn } ->
        # do stuff
        redirect conn, to: "/profile"
      { :error, reason, conn }-> redirect conn, to: "/error"
    end
  end
end