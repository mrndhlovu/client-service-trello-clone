import { ICardItem } from "./ListItem"
import styled from "styled-components"
import { AiOutlineEdit } from "react-icons/ai"
import { Button } from "@chakra-ui/react"

interface ICardStyles {
  cover: string
}

const Container = styled.div<ICardStyles>``

const ListCardItem = ({ card }: ICardItem) => {
  return (
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
        <span className="list-card-title">{card.title}</span>
      </div>
    </Container>
  )
}

export default ListCardItem
