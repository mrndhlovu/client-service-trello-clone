import { useState } from "react"
import styled from "styled-components"

import { FiEdit2 } from "react-icons/fi"
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

const CardLabel = styled.span<{ color: string }>`
  background-color: ${props => props.color || "none"};
`

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
        <Container
          cover={card?.cover}
          className={`list-card ${isOpen ? "edit-open" : ""}`}
        >
          <div className="list-card-cover" />
          <div className="list-card-labels">
            {card?.prefs?.labels.map((label: string, index: number) => (
              <CardLabel className="card-label " color={label} key={index} />
            ))}
          </div>

          {!isOpen && (
            <Button onClick={toggleEditMenu} size="xs" className="edit-button">
              <FiEdit2 size={15} />
            </Button>
          )}

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
