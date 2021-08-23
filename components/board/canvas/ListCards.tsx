import update from "immutability-helper"
import { useState, useCallback, useEffect, useRef } from "react"
import { isEmpty } from "lodash"

import { getErrorMessage } from "../../../util"
import { clientRequest } from "../../../api"
import { ICardItem } from "./ListItem"
import {
  CardContext,
  useBoard,
  useGlobalState,
  useListContext,
} from "../../../lib/hooks/context"
import ListCardItem from "./ListCardItem"
import { IDraggingProps } from "./BoardCanvas"
import { IDndItem } from "../dnd/DraggableList"

interface IProps {
  listId: string
}

const ListCards = ({ listId }: IProps) => {
  const { board } = useBoard()
  const { notify } = useGlobalState()
  const { handleUpdateList } = useListContext()
  const [cards, setCards] = useState<ICardItem[]>()
  const [dragging, setDragging] = useState<IDraggingProps>()

  const originalCards = useRef<ICardItem[]>()
  const hasCards = !isEmpty(cards)

  const saveCardChanges = async (dropItem: IDndItem) => {
    const dropTarget = originalCards.current[dropItem.index]

    await clientRequest
      .moveCard({
        ...dragging,
        target: { position: dropTarget.position, id: dropTarget.id },
      })
      .catch(err => {
        notify({
          description: getErrorMessage(err.response.data),
          placement: "top",
        })
      })
  }

  const onMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragList = cards[dragIndex]

      const updatedCards = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList],
        ],
        $apply: function (list: ICardItem[]) {
          const newList = list.map((item, index) => ({
            ...item,
            position: index,
          }))

          return newList
        },
      })

      if (!dragging?.source?.id) {
        setDragging({
          source: { id: dragList.id, position: dragList.position },
        })
      }

      setCards(updatedCards)
    },
    [cards]
  )

  useEffect(() => {
    setCards(board.cards)
  }, [board])

  useEffect(() => {
    if (hasCards && isEmpty(originalCards.current)) {
      originalCards.current = cards
    }
  }, [hasCards, cards])

  return (
    <CardContext.Provider value={{ onMoveCard, saveCardChanges }}>
      <div className="list-cards">
        {cards?.map(
          (card, index) =>
            card.listId === listId && (
              <ListCardItem cardIndex={index} card={card} key={card.id} />
            )
        )}
      </div>
    </CardContext.Provider>
  )
}

export default ListCards
