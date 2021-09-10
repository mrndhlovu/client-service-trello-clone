import { Button } from "@chakra-ui/button"
import { IPowerUp } from "./PowerUps"

const Spotify = ({ powerUp }: { powerUp: IPowerUp }) => {
  const isActive = powerUp?.status === "active"

  const handleConnect = () => {
    const scopes =
      "user-read-email playlist-modify-private playlist-read-private user-read-playback-state"

    const redirectUrl =
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.NEXT_PUBLIC_SPOTIFY_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/powerup/spotify`)
    window.location.assign(redirectUrl)
  }

  return isActive ? (
    <div className="connected-spotify">
      <Button colorScheme="green" size="sm" onClick={handleConnect}>
        Connected to Spotify
      </Button>
      <small>Since: {powerUp?.createdAt}</small>
    </div>
  ) : (
    <Button size="sm" onClick={handleConnect}>
      Connect to spotify
    </Button>
  )
}

export default Spotify
