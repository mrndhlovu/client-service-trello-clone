import { useBoard } from "../../../lib/providers"
import { CardContextProvider } from "../../../lib/providers/CardContextProvider"
import ListCardItem from "./ListCardItem"

const ListCards = ({ listIndex, listId }) => {
  const { board } = useBoard()

  return (
    <div className="list-cards">
      {board?.cards?.map(
        (card, index) =>
          card?.id &&
          !card?.archived &&
          card.listId === listId && (
            <CardContextProvider key={card?.id} card={card} cardIndex={index}>
              <ListCardItem
                listIndex={listIndex}
                listId={listId}
                cardIndex={index}
                card={card}
              />
            </CardContextProvider>
          )
      )}
    </div>
  )
}

export default ListCards
