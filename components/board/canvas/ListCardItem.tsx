import { useState } from "react"
import styled from "styled-components"

import { AiOutlineEdit } from "react-icons/ai"
import { Button, Modal } from "@chakra-ui/react"

import { ICardItem } from "./ListItem"
import DraggableCard from "../dnd/DraggableCard"
import EditCardMenu from "./EditCardMenu"

interface ICardStyles {
  cover: string
}

interface IProps {
  card: ICardItem
  cardIndex: number
  listId: string
  listIndex: number
}

const Container = styled.div<ICardStyles>``

const ListCardItem = ({ card, cardIndex, listIndex, listId }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleEditMenu = () => setIsOpen(prev => !prev)

  return (
    <>
      <DraggableCard
        cardId={card?.id}
        index={cardIndex}
        listId={listId}
        listIndex={listIndex}
      >
        <Container cover={card?.cover} className="list-card">
          <div className="list-card-cover" />
          <div className="list-card-labels">
            {card?.prefs?.labels.map((label: string, index: number) => (
              <span className="card-label " color={label} key={index} />
            ))}
          </div>

          <div className="list-card-details">
            {isOpen ? (
              <EditCardMenu
                cardId={card?.id}
                listId={listId}
                title={card.title}
                close={toggleEditMenu}
              />
            ) : (
              <span className="list-card-title">{card?.title}</span>
            )}
            {!isOpen && (
              <Button
                onClick={toggleEditMenu}
                size="xs"
                className="edit-button"
              >
                <AiOutlineEdit />
              </Button>
            )}
          </div>
        </Container>
        <Modal size="full" isOpen={isOpen} onClose={toggleEditMenu}>
          <div className="card-editor-overlay" />
        </Modal>
      </DraggableCard>
    </>
  )
}

export default ListCardItem
