import { useState } from "react"
import Link from "next/link"
import styled from "styled-components"

import { FiEdit2 } from "react-icons/fi"
import { Button, Modal, ModalOverlay } from "@chakra-ui/react"

import { IAttachment } from "./cardActions/ChangeCover"
import {
  useBoard,
  useCardContext,
  useListCardsContext,
} from "../../../lib/providers"
import CardActions from "./cardActions/CardActions"
import EditCardMenu from "./EditCardMenu"
import { ROUTES } from "../../../util/constants"
import { useRouter } from "next/router"
import CardModal from "./card/CardModal"

interface ICardProps {
  colorCover?: string
  image?: IAttachment
}

const CardLabel = styled.span<{ color: string }>`
  background-color: ${props => props.color || "none"};
`

const CardImageCover = styled.div<ICardProps>`
  background-image: url("${props => props?.image.url}");
  min-height: 100px;
  background-size: contain;
  height: ${props => props.image.height}px;
  width: ${props => props.image.width}px;
  background-color: ${props => props.image.edgeColor};
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

const CardBgCover = styled.div<ICardProps>`
  background-color: ${props => props.colorCover};
  height: 32px;
`

interface IProps {
  toggleActionsMenu: () => void
  actionsOpen: boolean
}

const CardItem = ({ toggleActionsMenu, actionsOpen }: IProps) => {
  const { saveCardChanges, listId } = useListCardsContext()
  const { card } = useCardContext()
  const { boardId } = useBoard()
  const { query } = useRouter()

  const handleSave = (title: string) => {
    saveCardChanges(card.id, listId, { title })
    toggleActionsMenu()
  }

  return (
    <Link href={`/${ROUTES.board}/${boardId}/?activeCard=${card?.id}`}>
      <a href="#">
        {card?.colorCover && !card?.imageCover?.active && (
          <CardBgCover
            colorCover={card?.colorCover}
            className="list-card-cover"
          />
        )}
        {card?.imageCover?.url && card.imageCover?.active && (
          <CardImageCover
            image={card?.imageCover}
            className="list-card-cover"
          />
        )}
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
        <Modal
          size="full"
          isOpen={actionsOpen}
          onClose={toggleActionsMenu}
          closeOnOverlayClick={true}
        >
          <ModalOverlay className="card-editor-overlay" />
        </Modal>
        {query?.activeCard !== undefined && (
          <CardModal isOpen={query?.activeCard !== undefined} />
        )}
      </a>
    </Link>
  )
}

export default CardItem
