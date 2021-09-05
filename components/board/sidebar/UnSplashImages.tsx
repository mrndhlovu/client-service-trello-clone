import { Button, Divider, Input } from "@chakra-ui/react"
import { isEmpty } from "lodash"
import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  useCallback,
} from "react"
import styled from "styled-components"

import { clientRequest } from "../../../api"
import { useGlobalState } from "../../../lib/hooks/context"

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
  const { notify } = useGlobalState()

  const [images, setImages] = useState<IUnSplashImage[] | []>([])
  const [query, setQuery] = useState<string>("nature")
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageTotal, setPageTotal] = useState<number>(0)

  const hasNext = pageTotal > page

  const handleSearch = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return
    getImages()
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value)
  }

  const getImages = useCallback(() => {
    notify({ description: "Processing...", placement: "top-right" })
    setIsLoading(true)
    clientRequest
      .getUnsplashImages(query, page)
      .then(res => {
        setImages(prev => [...prev, ...res.data.results])
        setPage(prev => prev + 1)

        setPageTotal(res.data.total_pages)
      })
      .catch(err => {})
      .finally(() => setIsLoading(false))
  }, [query, page, notify])

  useEffect(() => {
    getImages()
  }, [])

  useEffect(() => {
    setImages([])
  }, [query])

  return (
    <>
      <div>
        <Input
          size="md"
          placeholder="Search photo"
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </div>
      <Divider className="divider" />
      <div className="tiles-wrapper images">
        <div className="tile-content">
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
        <Divider className="divider" />

        {!isEmpty(images) && hasNext && (
          <Button
            colorScheme="green"
            onClick={getImages}
            size="sm"
            isFullWidth
            isLoading={isLoading}
          >
            Load more...
          </Button>
        )}
      </div>
    </>
  )
}

export default UnSplashImages
