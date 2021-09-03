import { useState } from "react"
import styled from "styled-components"

import { FiEdit2 } from "react-icons/fi"
import { Button, Modal, ModalOverlay } from "@chakra-ui/react"

import { ICardItem } from "./ListItem"
import { useListCardsContext } from "../../../lib/providers"
import DraggableCard from "../dnd/DraggableCard"
import EditCardMenu from "./EditCardMenu"
import CardActions from "./cardActions/CardActions"
import { IAttachment } from "./cardActions/ChangeCover"

interface ICardProps {
  colorCover?: string
  image?: IAttachment
}

interface IProps {
  card: ICardItem
  cardIndex: number
  listId: string
  listIndex: number
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

const ListCardItem = ({ card, cardIndex, listIndex, listId }: IProps) => {
  const { saveCardChanges } = useListCardsContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleEditMenu = () => setIsOpen(prev => !prev)

  const handleSave = (title: string) => {
    saveCardChanges(card.id, listId, { title })
    toggleEditMenu()
  }

  return (
    <>
      <DraggableCard
        cardId={card?.id}
        index={cardIndex}
        listId={listId}
        listIndex={listIndex}
        actionOpen={isOpen}
      >
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
        {!isOpen && (
          <Button onClick={toggleEditMenu} size="xs" className="edit-button">
            <FiEdit2 size={15} />
          </Button>
        )}

        {isOpen && (
          <CardActions
            close={toggleEditMenu}
            listId={listId}
            cardId={card.id}
          />
        )}

        <div className={`list-card ${isOpen ? "edit-open" : ""}`}>
          <div className="list-card-details">
            <div className="list-card-labels">
              {card?.labels.map((label: string, index: number) => (
                <CardLabel className="card-label " color={label} key={index} />
              ))}
            </div>

            {isOpen ? (
              <EditCardMenu
                title={card.title}
                close={toggleEditMenu}
                save={handleSave}
              />
            ) : (
              <span className="list-card-title">{card?.title}</span>
            )}
          </div>
        </div>
        <Modal
          size="full"
          isOpen={isOpen}
          onClose={toggleEditMenu}
          closeOnOverlayClick={true}
        >
          <ModalOverlay className="card-editor-overlay" />
        </Modal>
      </DraggableCard>
    </>
  )
}

export default ListCardItem
