import { useCallback, useEffect, useRef, useState } from "react"
import { isEmpty } from "lodash"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import update from "immutability-helper"

import {
  ListContext,
  useBoard,
  useGlobalState,
} from "../../../lib/hooks/context"
import { clientRequest } from "../../../api"
import { getErrorMessage } from "../../../util"
import { IDndItem } from "../dnd/DraggableList"
import AddList from "./AddList"
import BoardCanvasStyles from "./BoardCanvasStyles"
import ListItem, { IListItem } from "./ListItem"

export interface IDraggingProps {
  source: {
    position: number
    id: string
  }
  target?: {
    position: number
    id: string
  }
}

const BoardCanvas = () => {
  const { board, setActiveBoard } = useBoard()
  const { notify } = useGlobalState()

  if (!board) return null
  const [lists, setLists] = useState<IListItem[]>([])
  const [dragging, setDragging] = useState<IDraggingProps>()
  const hasBoardList = !isEmpty(lists)
  const originalList = useRef<IListItem[]>()

  const updateBoardLists = (updatedListItem: IListItem) => {
    const newList = board.lists.map((list: IListItem) =>
      list.id === updatedListItem.id ? updatedListItem : list
    )

    setActiveBoard({ ...board, lists: newList })
  }

  const saveChanges = async (dropItem: IDndItem) => {
    const dropTarget = originalList.current[dropItem.index]

    await clientRequest
      .moveList({
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

  const handleUpdateList = useCallback(
    async (listId: string, update: { [key: string]: any }) => {
      await clientRequest
        .updateList(update, { listId, boardId: board.id })
        .then(res => updateBoardLists(res.data))
        .catch(err =>
          notify({
            description: getErrorMessage(err.response.data),
            placement: "top",
          })
        )
    },
    [notify, board]
  )

  const onMoveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragList = lists[dragIndex]

      const updatedList = update(lists, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList],
        ],
        $apply: function (list: IListItem[]) {
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

      setLists(updatedList)
    },
    [lists]
  )

  useEffect(() => {
    setLists(board.lists)
  }, [board])

  useEffect(() => {
    if (hasBoardList && isEmpty(originalList.current)) {
      originalList.current = lists
    }
  }, [hasBoardList, lists])

  return (
    <ListContext.Provider
      value={{
        onMoveList,
        handleUpdateList,
        updateBoardLists,
        saveChanges,
        sourceIndex: dragging?.source?.position,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <BoardCanvasStyles>
          <div className="content">
            {lists?.map(
              (listItem: IListItem, index: number) =>
                !listItem.archived && (
                  <ListItem
                    key={listItem.id}
                    listIndex={index}
                    listItem={listItem}
                  />
                )
            )}
            <AddList isFirst={hasBoardList} />
          </div>
        </BoardCanvasStyles>
      </DndProvider>
    </ListContext.Provider>
  )
}

export default BoardCanvas
