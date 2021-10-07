import { CardContextProvider } from "../../../lib/providers/CardContextProvider"
import { useBoard, useListItemContext } from "../../../lib/providers"
import DraggableCard from "../dnd/DraggableCard"

const ListCards = () => {
  const { board } = useBoard()
  const { listIndex, listId } = useListItemContext()

  return (
    <div className="list-cards">
      {board?.cards?.map(
        (card, index) =>
          card?.id &&
          !card?.archived &&
          card.listId === listId && (
            <CardContextProvider
              listId={listId}
              listIndex={listIndex}
              key={card?.id}
              card={card}
              cardIndex={index}
            >
              <DraggableCard />
            </CardContextProvider>
          )
      )}
    </div>
  )
}

export default ListCards
