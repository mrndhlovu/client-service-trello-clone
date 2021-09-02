import { useState } from "react"
import styled from "styled-components"

import { FiEdit2 } from "react-icons/fi"
import { Button, Menu, MenuItem, Modal, ModalOverlay } from "@chakra-ui/react"
import { AiFillSwitcher, AiOutlineIdcard, AiOutlineTag } from "react-icons/ai"
import { CgCreditCard } from "react-icons/cg"

import { ICardItem } from "./ListItem"
import { useListCardsContext } from "../../../lib/providers"
import DraggableCard from "../dnd/DraggableCard"
import EditCardMenu from "./EditCardMenu"
import CardActions from "./CardActions"

interface ICardProps {
  cover: string
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

const CardCover = styled.div<ICardProps>`
  background-image: url("${props => props?.cover}");
  width: 100%;
  height: 300px;
`
const testImage =
  "https://cdn.pixabay.com/photo/2017/03/27/13/02/elephants-2178578_960_720.jpg"

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
      >
        <div className={`list-card ${isOpen ? "edit-open" : ""}`}>
          {!isOpen && (
            <Button onClick={toggleEditMenu} size="xs" className="edit-button">
              <FiEdit2 size={15} />
            </Button>
          )}
          <div className="list-card-details">
            <CardCover
              cover={card?.cover || testImage}
              className="list-card-cover"
            />
            <div className="list-card-labels">
              {card?.labels.map((label: string, index: number) => (
                <CardLabel className="card-label " color={label} key={index} />
              ))}
            </div>

            {isOpen && (
              <CardActions
                close={toggleEditMenu}
                listId={listId}
                cardId={card.id}
              />
            )}
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
