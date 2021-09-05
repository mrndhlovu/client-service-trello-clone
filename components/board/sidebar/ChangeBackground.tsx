import { Divider, Input } from "@chakra-ui/react"
import { ChangeEvent, useRef } from "react"
import { MouseEvent, useState } from "react"
import { FiPlus } from "react-icons/fi"
import styled from "styled-components"

import { clientRequest } from "../../../api"
import { useGlobalState } from "../../../lib/hooks/context"
import { IBoard, useBoard } from "../../../lib/providers"
import {
  COLORS_IMAGE,
  LABEL_DEFAULT_OPTIONS,
  PHOTOS_IMAGE,
} from "../../../util/constants"
import UnSplashImages from "./UnSplashImages"

const Container = styled.div<{ photos: string; colors: string }>`
  .tiles-wrapper {
    display: flex;
    position: relative;
    height: 100%;
  }

  .colors-wrapper {
    display: grid;
    position: relative;
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .tile {
    ${props => props.theme.mixins.flex("column")};
    cursor: pointer;
    float: left;
    padding: 0 4px;
    position: relative;
    text-align: center;
    width: 50%;

    input {
      display: none;
    }

    span {
      font-size: 14px;
    }
  }
  .tile-image,
  .tile-colors {
    border-radius: 8px;
    height: 96px;
    margin-bottom: 8px;
    width: 100%;
    background-color: #dfe1e6;
    background-size: cover;
  }

  .tile-image {
    background-image: url("${props => props.photos}");
  }
  .tile-colors {
    background-image: url("${props => props.colors}");
  }

  .tile.custom {
    background: #091e420a;
    height: 96px;
    border-radius: 8px;
  }

  h4 {
    margin-bottom: 10px;
  }
`

const ColorOption = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  height: 96px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
`

const ChangeBackground = ({ handleMenuChange, openMenu }) => {
  const inputRef = useRef<HTMLInputElement>()
  const { saveBoardChanges, setActiveBoard, boardId } = useBoard()
  const { notify } = useGlobalState()

  const [boardImages, setBoardImages] = useState<[{ [key: string]: any }] | []>(
    []
  )

  const handleSelectedColor = async (ev: MouseEvent) => {
    const updatedBoard = await saveBoardChanges({
      "prefs.color": ev.currentTarget.id,
    })

    if (!updatedBoard) return

    setActiveBoard((prev: IBoard) => ({
      ...prev,
      prefs: { ...prev.prefs, color: updatedBoard?.prefs?.color },
    }))
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.currentTarget.files[0]
    if (!file)
      return notify({
        description: "No image found",
        placement: "top",
        status: "info",
      })

    const fileSize = file.size / 1024 / 1024

    if (fileSize > 1)
      return notify({
        description: "Image upload size limit is 1MB",
        placement: "top",
        status: "info",
      })

    const formData = new FormData()
    formData.append("file", file)

    clientRequest
      .uploadBoardBgImage(formData, boardId)
      .then(res => {
        // setBoardImages(prev => [...prev, res.data])
        setActiveBoard((prev: IBoard) => ({
          ...prev,
          prefs: { ...prev.prefs, image: res.data.url },
        }))
      })
      .catch(err => {
        notify({
          description: err.message,
          placement: "top",
          status: "error",
        })
      })
  }

  const handleSelectedOption = (ev: MouseEvent) => {
    if (ev.currentTarget.id === "custom") {
      inputRef.current.click()

      return
    }

    handleMenuChange(ev)
  }

  return (
    <Container colors={COLORS_IMAGE} photos={PHOTOS_IMAGE}>
      {openMenu === "changeColor" && (
        <>
          <div className="tiles-wrapper">
            <div id="photo" onClick={handleSelectedOption} className="tile">
              <div className="tile-image" />
              <span className="">Photos</span>
            </div>
            <div id="colors" onClick={handleSelectedOption} className="tile">
              <div className="tile-colors" />
              <span className="">Colors</span>
            </div>
          </div>
          <Divider className="divider" />

          <h4>Custom</h4>

          <div
            id="custom"
            onClick={handleSelectedOption}
            className="tile custom"
          >
            <div className="tile-custom" />
            <FiPlus size={22} />
            <Input
              className="image-upload"
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              multiple={false}
            />
          </div>
        </>
      )}

      {openMenu === "photo" && <UnSplashImages />}

      {openMenu === "colors" && (
        <div className="colors-wrapper">
          {LABEL_DEFAULT_OPTIONS.map((option, index) => (
            <ColorOption
              onClick={handleSelectedColor}
              id={option.color}
              key={index}
              bgColor={option.color}
              className="color-option"
            />
          ))}
        </div>
      )}
    </Container>
  )
}

export default ChangeBackground
