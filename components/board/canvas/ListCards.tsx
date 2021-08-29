import { useListCardsContext } from "../../../lib/providers"
import ListCardItem from "./ListCardItem"

const ListCards = ({ listIndex, listId }) => {
  const { cards } = useListCardsContext()

  return (
    <div className="list-cards">
      {cards?.map((card, index) => (
        <ListCardItem
          listIndex={listIndex}
          listId={listId}
          cardIndex={index}
          card={card}
          key={card?.id}
        />
      ))}
    </div>
  )
}

export default ListCards
