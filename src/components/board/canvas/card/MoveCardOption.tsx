import { Button } from "@chakra-ui/button"
import { Select } from "@chakra-ui/select"
import { isEmpty, times } from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import {
  IBoard,
  useBoard,
  useCardContext,
  useGlobalState,
  useListCardsContext,
} from "../../../../lib/providers"
import { ICardItem, IListItem } from "../ListItem"

interface IMoveCardOptions {
  boardId: string
  listId: string
  cardPosition: number
}

const MoveCardOption = () => {
  const { findCardsByListId, findListById, boardId } = useBoard()
  const { boards } = useGlobalState()
  const { listId } = useListCardsContext()
  const { cardId, cardIndex } = useCardContext()

  const defaultBoardIndex = boards.findIndex(item => item.id === boardId)

  const [boardOptions, setBoardOptions] = useState<IBoard[]>([])
  const [activeBoard, setActiveBoard] = useState<IBoard>(
    boards.find(board => board.id === boardId)
  )

  const [listOptions, setListOptions] = useState<IListItem[]>([])
  const [activeList, setActiveList] = useState<IListItem | undefined>()
  const [cards, setCards] = useState<ICardItem[] | string[]>([])

  const [selected, setSelected] = useState<IMoveCardOptions>({
    boardId,
    listId,
    cardPosition: cardIndex,
  })

  const handleSelectedBoard = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value

    console.log("====================================")
    console.log(id)
    console.log("====================================")
    if (!id) return

    setSelected(prev => ({ ...prev, boardId: id }))
  }

  const handleSelectedList = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value

    setSelected(prev => ({ ...prev, listId: id }))
  }

  const handleSelectedPosition = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const value = ev.currentTarget?.value

    setSelected(prev => ({ ...prev, cardPosition: +value }))
  }

  const handleMove = () => {
    console.log("====================================")
    console.log(selected)
    console.log("====================================")
  }

  useEffect(() => {
    setBoardOptions(boards)
  }, [boards, boardId])

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
    setCards(activeList?.cards)
  }, [activeList])

  console.log(listOptions, cards, activeBoard)

  return (
    <div>
      <h4>Select Destination</h4>
      <div className="content">
        <div className="board-options">
          <label htmlFor="board-select">Board</label>
          <Select
            defaultValue={selected.boardId}
            onChange={handleSelectedBoard}
          >
            {boardOptions?.map((item, index) => (
              <option key={item.id} value={item.id}>
                {` ${item.title} ${
                  defaultBoardIndex === index ? "(current)" : ""
                }`}
              </option>
            ))}
          </Select>
        </div>

        <div className="list-options">
          <div className="list-select">
            <label htmlFor="list-select">List</label>

            <Select
              defaultValue={selected?.listId}
              onChange={handleSelectedList}
            >
              {listOptions?.map((item, index) => (
                <option key={item.id} value={item.id}>
                  {` ${item.title} ${
                    activeList?.id === item.id ? "(current)" : ""
                  }`}
                </option>
              ))}
            </Select>
          </div>

          <div className="position">
            <label htmlFor="position-select">Position</label>

            <Select
              defaultValue={selected?.cardPosition}
              onChange={handleSelectedPosition}
            >
              {(cards as string[])?.map((card, index) => (
                <option key={index} value={index}>
                  {` ${index} ${cardId === card ? "(current)" : ""}`}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <Button onClick={handleMove} colorScheme="blue" size="sm">
          Move
        </Button>
      </div>
    </div>
  )
}

export default MoveCardOption
