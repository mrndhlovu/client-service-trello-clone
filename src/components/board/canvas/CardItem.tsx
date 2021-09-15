import { useRouter } from "next/router"
import { MouseEvent, useState } from "react"
import styled, { css } from "styled-components"

import { FiEdit2 } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import { Button, Modal, ModalOverlay } from "@chakra-ui/react"

import {
  useBoard,
  useCardContext,
  useListCardsContext,
} from "../../../lib/providers"
import CardActions from "./cardActions/CardActions"
import CardModal from "./card/CardModal"
import EditCardMenu from "./EditCardMenu"
import { ROUTES } from "../../../util/constants"

export interface ICardCoverProps {
  colorCover?: string
  imageCover?: string
  edgeColor?: string
  height?: string
  width?: string
}

const CardLabel = styled.span<{ color: string }>`
  background-color: ${props => props.color || "none"};
`

const StyledSpan = styled.span``

const CardCover = styled.div<ICardCoverProps>`
  ${props =>
    props.imageCover
      ? css<ICardCoverProps>`
          background-image: url("${props => props?.imageCover}");
          min-height: 100px;
          background-size: contain;
          height: ${props => (props.height ? `${props.height}px` : "initial")};
          background-color: ${props => props.edgeColor};
          border-radius: 3px 3px 0;
          background-position: 50%;
          background-repeat: no-repeat;
          width: 100%;
          max-height: 270px;

          &.image-cover-full {
            background-position: none;
            background-size: cover;
          }
        `
      : css<ICardCoverProps>`
          background-color: ${props => props.colorCover};
          height: 32px;
        `};
`

interface IProps {
  toggleActionsMenu: () => void
  actionsOpen: boolean
}

const CardItem = ({ toggleActionsMenu, actionsOpen }: IProps) => {
  const { saveCardChanges } = useListCardsContext()
  const { boardId } = useBoard()
  const {
    card,
    imageCover,
    showCardCover,
    colorCover,
    edgeColor,
    coverUrl,
    coverSize,
    listId,
  } = useCardContext()
  const { query, replace } = useRouter()
  const { asPath, push } = useRouter()
  const cardModalOpen =
    query?.openModalId !== undefined && query?.openModalId === card?.id

  const handleSave = (title: string) => {
    saveCardChanges(card.id, listId, { title })
    toggleActionsMenu()
  }

  const toggleCardModal = (ev?: MouseEvent) => {
    if (!ev || cardModalOpen) {
      replace(`/${ROUTES.board}/${boardId}`, undefined, { shallow: true })

      return
    }

    ev.preventDefault()
    replace(`${asPath}/?openModalId=${card?.id}`, undefined, { shallow: true })
  }

  return (
    <>
      {!actionsOpen && (
        <Button onClick={toggleActionsMenu} size="xs" className="edit-button">
          <FiEdit2 size={15} />
        </Button>
      )}

      {actionsOpen && (
        <CardActions
          close={toggleActionsMenu}
          listId={listId}
          cardId={card.id}
        />
      )}
      <StyledSpan onClick={toggleCardModal}>
        {showCardCover && (
          <CardCover
            className="list-card-cover"
            imageCover={imageCover || coverUrl}
            edgeColor={edgeColor}
            colorCover={colorCover}
            width={coverSize?.width}
            height={coverSize?.height}
          />
        )}

        <div className={`list-card ${actionsOpen ? "edit-open" : ""}`}>
          <div className="list-card-details">
            <div className="list-card-labels">
              {card?.labels.map((label: string, index: number) => (
                <CardLabel className="card-label " color={label} key={index} />
              ))}
            </div>

            {actionsOpen ? (
              <EditCardMenu
                title={card.title}
                close={toggleActionsMenu}
                save={handleSave}
              />
            ) : (
              <span className="list-card-title">{card?.title}</span>
            )}
          </div>
        </div>
      </StyledSpan>
      {cardModalOpen && (
        <CardModal onClose={toggleCardModal} isOpen={cardModalOpen} />
      )}

      <Modal size="full" isOpen={actionsOpen} onClose={toggleActionsMenu}>
        <ModalOverlay
          onClick={toggleActionsMenu}
          className="card-editor-overlay"
        />
        <AiOutlineClose
          size={22}
          className="card-actions-close-btn"
          onClick={toggleActionsMenu}
        />
      </Modal>
    </>
  )
}

export default CardItem
