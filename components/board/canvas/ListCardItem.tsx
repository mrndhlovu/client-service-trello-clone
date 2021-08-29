import { ICardItem } from "./ListItem"
import styled from "styled-components"
import { AiOutlineEdit } from "react-icons/ai"
import { Button } from "@chakra-ui/react"

import DraggableCard from "../dnd/DraggableCard"

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
  return (
    <DraggableCard
      cardId={card?.id}
      index={cardIndex}
      listId={listId}
      listIndex={listIndex}
    >
      <Container cover={card?.cover} className="list-card">
        <div className="list-card-cover" />
        <Button className="edit-button" size="xs">
          <AiOutlineEdit />
        </Button>
        <div className="list-card-labels">
          {card?.prefs?.labels.map((label: string, index: number) => (
            <span className="card-label " color={label} key={index} />
          ))}
        </div>

        <div className="list-card-details">
          <span className="list-card-title">{card?.title}</span>
        </div>
      </Container>
    </DraggableCard>
  )
}

export default ListCardItem
