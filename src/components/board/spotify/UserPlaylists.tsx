import { Select } from "@chakra-ui/select"
import { ChangeEvent, useEffect, useState } from "react"

import { clientRequest } from "../../../api"
import { useSpotify } from "../../../lib/providers"

export interface IUserPlaylist {
  id: string
  name: string
  uri: string
  tracks: {
    href: string
    total: number
  }
  [key: string]: any
}

const UserPlaylists = () => {
  const { setActivePlaylist, activePlaylist } = useSpotify()
  const [playlists, setPlaylists] = useState<IUserPlaylist[]>([])

  const handleSelectedPlaylist = (ev: ChangeEvent<HTMLSelectElement>) => {
    const selected = playlists.find(device => device.id === ev.target.value)
    if (!selected) return
    setActivePlaylist(selected)
    clientRequest
      .selectPlayer({ deviceId: selected.id, play: false })
      .catch(err => {})
  }

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getUsePlaylists(10, 0)
        .then(res => {
          setPlaylists(res.data?.items)
        })
        .catch(err => {})
    }
    getData()
  }, [])

  return (
    <Select
      onChange={handleSelectedPlaylist}
      size="xs"
      placeholder="Playlists"
      defaultValue={activePlaylist?.id || ""}
    >
      {playlists?.map(playlist => (
        <option
          selected={activePlaylist?.id === playlist.id}
          key={playlist.id}
          value={playlist.id}
        >
          {playlist.name}
        </option>
      ))}
    </Select>
  )
}

export default UserPlaylists
