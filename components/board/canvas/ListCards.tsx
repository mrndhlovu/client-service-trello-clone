import { useBoard } from "../../../lib/providers"
import ListCardItem from "./ListCardItem"

const ListCards = ({ listIndex, listId }) => {
  const { board } = useBoard()

  return (
    <div className="list-cards">
      {board?.cards?.map(
        (card, index) =>
          card?.id &&
          card.listId === listId && (
            <ListCardItem
              listIndex={listIndex}
              listId={listId}
              cardIndex={index}
              card={card}
              key={card?.id}
            />
          )
      )}
    </div>
  )
}

export default ListCards
