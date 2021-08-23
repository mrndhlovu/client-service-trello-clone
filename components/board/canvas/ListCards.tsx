import { useBoard } from "../../../lib/hooks/context"
import ListCardItem from "./ListCardItem"
import { ICardItem } from "./ListItem"

interface IProps {
  listId: string
}

const ListCards = ({ listId }: IProps) => {
  const { board } = useBoard()

  const cards: ICardItem[] = board?.cards

  return (
    <div className="list-cards">
      {cards.map(
        card =>
          card.listId === listId && <ListCardItem card={card} key={card.id} />
      )}
    </div>
  )
}

export default ListCards
