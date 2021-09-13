import { useRouter } from "next/router"

import { clientRequest } from "../../../api"
import { IPowerUp } from "./PowerUps"
import { SPOTIFY_LOGO } from "../../../util/constants"
import { useGlobalState } from "../../../lib/hooks/context"
import PowerUpListItem from "./PowerUpListItem"

const Spotify = ({ powerUp }: { powerUp: IPowerUp }) => {
  const { notify } = useGlobalState()
  const { newSpotify } = useRouter()?.query

  const isActive = powerUp?.status === "active"

  const handleConnect = () => {
    const scopes = [
      "user-read-playback-state, user-read-currently-playing, user-modify-playback-state",
    ]
    const state = ""
    clientRequest
      .getSpotifyRedirectUrl(scopes.join("|"), state)
      .then(res => window.location.assign(res.data.url))
      .catch(err =>
        notify({
          description: "Failed to connect with Spotify",
          placement: "top-right",
          title: "Connection issue",
        })
      )
  }

  const handleRevoke = () => {
    clientRequest
      .revokeSpotifyAccess(powerUp.id)
      .then(res => {})
      .catch(err => {})

    window.location.assign("https://www.spotify.com/ie/account/apps/")
  }

  return (
    <PowerUpListItem
      handleConnect={handleConnect}
      handleRevoke={handleRevoke}
      activeSince={powerUp?.createdAt.split("T")[0]}
      description="Controls playback on all devices from your board."
      isActive={isActive}
      image={SPOTIFY_LOGO}
      title="Spotify"
      isNew={newSpotify !== undefined}
    />
  )
}

export default Spotify
