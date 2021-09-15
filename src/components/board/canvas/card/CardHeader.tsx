import { ModalHeader, Button } from "@chakra-ui/react"
import { AiOutlineClose } from "react-icons/ai"
import { BsCardHeading } from "react-icons/bs"
import { IoMdCard } from "react-icons/io"
import styled, { css } from "styled-components"

import {
  useBoard,
  useCardContext,
  useGlobalState,
  useListCardsContext,
} from "../../../../lib/providers"
import { ICardCoverProps } from "../CardItem"
import { UIDropdown } from "../../../shared"
import ChangeCover from "../cardActions/ChangeCover"
import EditableTitle from "../../EditableTitle"
import MoveCardOption from "./MoveCardOption"

const CardCover = styled.div<ICardCoverProps>`
  border-radius: 3px 3px 0;
  background-origin: content-box;
  padding: 0px;
  position: relative;

  ${props =>
    props?.imageCover
      ? css<ICardCoverProps>`
          background-size: contain;
          background-color: ${props => props?.edgeColor};
          background-image: url("${props => props?.imageCover}");
          background-position: center center;
          position: relative;
          transition: opacity 85ms;
          width: 100%;
          height: 160px;
          min-height: 160px;
          background-repeat: no-repeat;
          transition: opacity 85ms;
        `
      : css<ICardCoverProps>`
          height: 116px;
          min-height: 116px;
          background-size: initial;
          background-position: left center;
          background-color: ${props => props?.colorCover!};
        `};
`

const CardHeader = ({ onClose }) => {
  const {
    card,
    cardId,
    imageCover,
    showCardCover,
    colorCover,
    edgeColor,
    coverSize,
    coverUrl,
    cardIndex,
    listId,
  } = useCardContext()
  const { boards } = useGlobalState()
  const { saveCardChanges } = useListCardsContext()
  const { findListById, boardId, board } = useBoard()

  const [list] = findListById(listId)
  const boardIdex = boards.findIndex(boardItem => boardItem.id === boardId)
  console.log(list?.title)

  const handleUpdateTitle = (newTitle: string) => {
    saveCardChanges(cardId, listId, { title: newTitle })
  }

  const handleMove = (
    newBoardId: string,
    newListId: string,
    newCardIndex: number
  ) => {
    const isChangingCardPosition = cardIndex !== newCardIndex
    const isChangingList = listId !== newListId
    const isChangingBoard = newBoardId !== boardId

    console.log("====================================")
    console.log(isChangingCardPosition, isChangingBoard, isChangingList)
    console.log("====================================")
  }

  return (
    <>
      {showCardCover && (
        <CardCover
          imageCover={imageCover || coverUrl}
          edgeColor={edgeColor}
          colorCover={colorCover}
          width={coverSize?.width}
          height={coverSize?.height}
          className="modal-card-cover"
        />
      )}

      <ModalHeader>
        {showCardCover && (
          <UIDropdown
            className="header-cover-btn"
            toggle={
              <Button leftIcon={<IoMdCard />} colorScheme="gray" size="sm">
                Cover
              </Button>
            }
            heading="Cover"
          >
            <ChangeCover />
          </UIDropdown>
        )}

        <div className="card-header-content">
          <BsCardHeading />
          <EditableTitle handleUpdate={handleUpdateTitle} title={card.title} />
          <div className="list-id">
            <p>
              in list{" "}
              <UIDropdown
                toggle={
                  <span>
                    <button className="list-title">{list?.title}</button>
                  </span>
                }
                heading="Move card"
              >
                <MoveCardOption />
              </UIDropdown>
            </p>
          </div>
        </div>
      </ModalHeader>
      <AiOutlineClose onClick={onClose} className="card-close-btn" size={22} />
    </>
  )
}

export default CardHeader
