import {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
} from "react"
import styled from "styled-components"
import { Divider, Input, usePrevious } from "@chakra-ui/react"

import { clientRequest } from "../../../api"
import { useOnScreen } from "../../../lib/hooks"
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

const DEFAULT_QUERY = "nature"

const UnSplashImages = ({ handleSelectedImage }: IProps) => {
  const [loadMoreObservableRef, isVisible] = useOnScreen({
    rootMargin: "20px 0px 0px",
  })
  const { notify } = useGlobalState()

  const [images, setImages] = useState<IUnSplashImage[] | []>([])
  const [query, setQuery] = useState<string>(DEFAULT_QUERY)
  const [nextPage, setNextPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageTotal, setPageTotal] = useState<number>(0)

  const lastImagePosition = images.length
  const previous = usePrevious({ page: nextPage, isVisible })
  const isFirstPage = nextPage === 1
  const isOnNextPage = previous?.page !== nextPage
  const hasMore = pageTotal > nextPage
  const stillVisibleAfterUpdate = isVisible === previous?.isVisible

  const handleSearch = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key !== "Enter") return
    getImages()
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value)
  }

  const getImages = () => {
    setIsLoading(true)
    clientRequest
      .getUnsplashImages(query, nextPage)
      .then(res => {
        setImages(prev => [...prev, ...res.data.results])
        setPageTotal(res.data.total_pages)
      })
      .catch(() =>
        notify({
          description: "Too many requests, please try again after 30 seconds",
          placement: "top-right",
        })
      )
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setImages([])
    setNextPage(1)
  }, [query])

  useEffect(() => {
    if (!isVisible || isOnNextPage || stillVisibleAfterUpdate) return
    setNextPage(prev => prev + 1)
  }, [isVisible, isOnNextPage, stillVisibleAfterUpdate])

  useEffect(() => {
    if (
      isLoading ||
      !isOnNextPage ||
      (!isVisible && !isFirstPage) ||
      (!hasMore && isVisible)
    )
      return

    getImages()
  }, [isLoading, isVisible, isFirstPage, isOnNextPage, hasMore])

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
              ref={
                lastImagePosition === index + 1
                  ? loadMoreObservableRef
                  : undefined
              }
              className={
                lastImagePosition === index + 1
                  ? "tile-img observable"
                  : "tile-img"
              }
            >
              <span>{option?.user?.first_name}</span>
            </ImageTile>
          ))}
        </div>
        <Divider className="divider" />
      </div>
    </>
  )
}

export default UnSplashImages
