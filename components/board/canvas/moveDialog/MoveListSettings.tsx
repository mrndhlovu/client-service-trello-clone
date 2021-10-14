import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "@chakra-ui/button"
import { isEmpty, times } from "lodash"
import {
  IBoard,
  useBoard,
  useGlobalState,
  useListItemContext,
  useListsContext,
} from "../../../../lib/providers"
import MoveDialogStyles from "./MoveDialogStyles"
import MoveSetting from "./MoveSetting"

interface IMoveListSettings {
  boardId: string
  position: number
  listId: string
}

interface IProps {
  onClose?: () => void
}

const MoveListSettings = ({ onClose }: IProps) => {
  const { boardId, board } = useBoard()
  const { boards, setBoards } = useGlobalState()

  const { listId, listIndex } = useListItemContext()
  const { moveList, saveListDndChanges, removeListFromSource } =
    useListsContext()

  const [boardOptions, setBoardOptions] = useState<IBoard[]>([])
  const [targetedBoard, setTargetedBoard] = useState<IBoard | undefined>()
  const [selected, setSelected] = useState<IMoveListSettings>({
    boardId,
    position: listIndex,
    listId,
  })

  const isOnSourceBoard = selected.boardId === boardId
  const hasChangedTargetBoard = !isOnSourceBoard || !isOnSourceBoard
  const targetBoardHasLists = !isEmpty(board?.lists)
  const disableSelectFields = hasChangedTargetBoard && !targetBoardHasLists
  const targetBoardListSize = targetedBoard?.lists?.length
  const selectedListIndex = targetedBoard?.lists.findIndex(
    list => list.id === selected.listId
  )
  const defaultPosition = selectedListIndex !== -1 ? selectedListIndex : 0
  const listOptions = targetBoardListSize > 1 ? targetBoardListSize : 1

  const handleSelectedBoard = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value

    if (!id) return
    const newBoard = boards.find(board => board.id === id)
    const targetList = newBoard?.lists[newBoard?.lists.length - 1]
    const position =
      !targetList || newBoard.lists.length === 0 ? 1 : newBoard.lists.length

    setTargetedBoard(newBoard)
    setSelected(prev => ({
      ...prev,
      boardId: id,
      position,
      listId: targetList?.id || listId,
    }))
  }

  const handleSelectedPosition = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const value = ev.currentTarget?.value
    const targetList = targetedBoard?.lists[+value]

    console.log({ value })

    setSelected(prev => ({
      ...prev,
      position: +value,
      listId: targetList?.id || listId,
    }))
  }

  const handleMove = () => {
    if (isOnSourceBoard) {
      moveList(listIndex, selected.position)
      saveListDndChanges({
        boardId,
        sourceListId: listId,
        targetListId: selected?.listId,
        targetBoardId: selected.boardId,
      })
    }

    if (!isOnSourceBoard) {
      removeListFromSource(listId)
      saveListDndChanges({
        boardId,
        isSwitchingBoard: true,
        sourceListId: listId,
        targetListId: selected.listId,
        targetBoardId: selected.boardId,
      })
    }

    setBoards([])
    setTargetedBoard(undefined)
    setSelected({ boardId: undefined, position: 0, listId: undefined })
    setBoardOptions([])

    if (onClose) onClose()
  }

  useEffect(() => {
    setBoardOptions(boards)
    setTargetedBoard(boards.find(board => board?.id === boardId))
  }, [boards])

  return (
    <MoveDialogStyles>
      <div className="content-dialog">
        <MoveSetting
          heading="Board"
          className="board"
          key="board"
          onChange={handleSelectedBoard}
          value={selected?.boardId}
        >
          {boardOptions?.map(item => (
            <option key={item.id} value={item.id}>
              {` ${item.title} ${boardId === item.id ? "(current)" : ""}`}
            </option>
          ))}
        </MoveSetting>

        <MoveSetting
          heading="Position"
          className="position"
          key="position"
          onChange={handleSelectedPosition}
          value={defaultPosition}
          disabled={!listOptions && !targetBoardHasLists}
        >
          <>
            {!disableSelectFields &&
              times(listOptions, index => {
                return (
                  <option key={index} value={index}>
                    {`${index + 1} ${
                      !hasChangedTargetBoard && listIndex === index
                        ? "(current)"
                        : ""
                    }`}
                  </option>
                )
              })}

            {disableSelectFields && <option value="no-cards">N/A</option>}
          </>
        </MoveSetting>

        <Button
          className="move-btn"
          onClick={handleMove}
          colorScheme="blue"
          size="sm"
          disabled={disableSelectFields}
        >
          Move
        </Button>
      </div>
    </MoveDialogStyles>
  )
}

export default MoveListSettings
