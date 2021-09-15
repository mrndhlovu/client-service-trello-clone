import { Button } from "@chakra-ui/button"
import { Select } from "@chakra-ui/select"
import { isEmpty, times } from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import {
  IBoard,
  useBoard,
  useCardContext,
  useGlobalState,
  useListContext,
} from "../../../../lib/providers"
import { ICardItem, IListItem } from "../ListItem"

interface IMoveCardOptions {
  boardId: string
  listId: string
  cardPosition: number
}

const MoveCardOption = () => {
  const { findCardsByListId, boardId } = useBoard()
  const { boards } = useGlobalState()
  const { cardId, cardIndex, listId, listIndex } = useCardContext()
  const { moveCard, saveCardDndChanges } = useListContext()

  const defaultBoardIndex = boards.findIndex(item => item.id === boardId)

  const [boardOptions, setBoardOptions] = useState<IBoard[]>([])
  const [activeBoard, setActiveBoard] = useState<IBoard>(
    boards.find(board => board.id === boardId)
  )

  const [listOptions, setListOptions] = useState<IListItem[]>([])
  const [activeList, setActiveList] = useState<IListItem | undefined>()
  const [cardOptions, setCardOptions] = useState<number>(0)
  const [selected, setSelected] = useState<IMoveCardOptions>({
    boardId,
    listId,
    cardPosition: cardIndex,
  })

  const listHasCards = activeList?.cards !== undefined
  const isSourceList = selected.listId === listId
  const isSourceBoard = selected.boardId === boardId
  const hasChanged = !isSourceList || !isSourceBoard
  const cardPosition = isSourceList
    ? selected.cardPosition
    : selected.cardPosition - 1

  const handleSelectedBoard = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value

    if (!id) return

    setSelected(prev => ({ ...prev, boardId: id }))
  }

  const handleSelectedList = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value
    const [listCards, hasCards] = findCardsByListId(id)
    const backToSource = listId === id

    setSelected(prev => ({
      ...prev,
      listId: id,
      cardPosition: backToSource ? listCards.length - 1 : listCards.length + 1,
    }))
  }

  const handleSelectedPosition = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const value = ev.currentTarget?.value

    setSelected(prev => ({ ...prev, cardPosition: +value }))
  }

  const handleMove = () => {
    if (isSourceList) {
      const targetCardId = activeList.cards?.[selected.cardPosition - 1]?.id
      moveCard(cardId, targetCardId)
      saveCardDndChanges({
        sourceCardId: cardId,
        targetCardId,
        sourceListId: listId,
        boardId,
      })
    }
  }

  useEffect(() => {
    setBoardOptions(boards)
  }, [boards])

  useEffect(() => {
    setActiveBoard(boardOptions?.find(board => board.id === selected.boardId))
  }, [boardOptions, selected.boardId])

  useEffect(() => {
    setListOptions(
      boardOptions?.find(board => board.id === selected.boardId)?.lists
    )
  }, [selected.boardId, boardOptions])

  useEffect(() => {
    setActiveList(listOptions?.find(list => list.id === selected.listId))
  }, [selected.listId, listOptions])

  useEffect(() => {
    setCardOptions(activeList?.cards.length)
  }, [activeList?.cards])
  console.log("====================================")
  console.log(selected)
  console.log("====================================")
  return (
    <div>
      <h4>Select Destination</h4>
      <div className="content">
        <div className="board-options">
          <label htmlFor="board-select">Board</label>
          <Select
            defaultValue={selected.boardId}
            onChange={handleSelectedBoard}
            id="board-select"
          >
            {boardOptions?.map(item => (
              <option key={item.id} value={item.id}>
                {` ${item.title} ${boardId === item.id ? "(current)" : ""}`}
              </option>
            ))}
          </Select>
        </div>

        <div className="list-options">
          <div className="list-select">
            <label htmlFor="list-select">List</label>

            <Select
              value={selected.listId}
              onChange={handleSelectedList}
              id="list-select"
              disabled={isEmpty(listOptions)}
            >
              {listHasCards &&
                listOptions?.map(item => (
                  <option id={item.id} key={item.id} value={item.id}>
                    {`${item.title} ${listId === item.id ? "(current)" : ""}`}
                  </option>
                ))}

              {!listHasCards && <option value="no-lists">No Lists</option>}
            </Select>
          </div>

          <div className="position">
            <label htmlFor="position-select">Position</label>

            <Select
              value={cardPosition}
              onChange={handleSelectedPosition}
              id="position-select"
              disabled={!cardOptions && !listHasCards}
            >
              {listHasCards &&
                times(hasChanged ? cardOptions + 1 : cardOptions, index => {
                  return (
                    index > 0 && (
                      <option key={index} value={index}>
                        {` ${index} ${cardIndex === index ? "(current)" : ""}`}
                      </option>
                    )
                  )
                })}

              {!cardOptions && !listHasCards && (
                <option value="no-cards">N/A</option>
              )}
            </Select>
          </div>
        </div>
        <Button
          className="move-btn"
          onClick={handleMove}
          colorScheme="blue"
          size="sm"
        >
          Move
        </Button>
      </div>
    </div>
  )
}

export default MoveCardOption
