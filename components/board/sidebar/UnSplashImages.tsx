import { Divider, Input } from "@chakra-ui/react"
import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
} from "react"
import styled from "styled-components"

import { clientRequest } from "../../../api"
import { IBoard, useBoard } from "../../../lib/providers"

export const ImageTile = styled.div<{ bgImage: string }>`
  background-image: url("${props => props.bgImage}");
  border-radius: 8px;
  height: 96px;
  margin-bottom: 8px;
  width: 100%;
  background-color: #dfe1e6;
  background-size: cover;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    bottom: 3px;
    left: 10px;
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      bottom: 0%;
      right: 0;
      left: 0;
      height: 20px;
    }
  }
`

interface IProps {
  handleSelectedImage: (ev: MouseEvent) => void
}

interface IUnSplashImage {
  [key: string]: any
  urls: {
    full: string
    thumb: string
  }
  user: {
    first_name?: string
    last_name?: string
    profile_url: string
  }
}

const UnSplashImages = ({ handleSelectedImage }: IProps) => {
  const [images, setImages] = useState<IUnSplashImage[] | []>([])
  const [query, setQuery] = useState<string>("nature")
  const [page, setPage] = useState<number>(0)

  const handleSearch = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return
    clientRequest
      .getUnsplashImages(query, page)
      .then(res => setImages(res.data.results))
      .catch(err => {})
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value)
  }

  useEffect(() => {
    const getData = () => {
      clientRequest
        .getUnsplashImages(query, page)
        .then(res => setImages(res.data.results))
        .catch(err => {})
    }

    getData()
  }, [])

  return (
    <>
      <Input
        size="sm"
        placeholder="Search photo"
        onChange={handleChange}
        onKeyDown={handleSearch}
        defaultValue={query}
      />
      <Divider className="divider" />
      <div className="colors-wrapper">
        {images.map((option: IUnSplashImage, index: number) => (
          <ImageTile
            onClick={handleSelectedImage}
            id={option?.urls.full}
            key={index}
            bgImage={option?.urls?.thumb}
          >
            <span>{option?.user?.first_name}</span>
          </ImageTile>
        ))}
      </div>
    </>
  )
}

export default UnSplashImages
