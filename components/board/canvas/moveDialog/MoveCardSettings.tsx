import { Button } from "@chakra-ui/button"
import { isEmpty, times } from "lodash"
import { ChangeEvent, useEffect, useState } from "react"
import {
  IBoard,
  useBoard,
  useCardContext,
  useGlobalState,
  useListsContext,
} from "../../../../lib/providers"
import { IListItem } from "../ListItem"
import MoveDialogStyles from "./MoveDialogStyles"
import MoveSetting from "./MoveSetting"

interface IMoveCardSettings {
  boardId: string
  listId: string
  cardPosition: number
}

interface IProps {
  onClose?: () => void
}

const MoveCardSettings = ({ onClose }: IProps) => {
  const { findCardsByListId, boardId } = useBoard()
  const { boards, setBoards } = useGlobalState()
  const { cardId, cardIndex, listId } = useCardContext()
  const { moveCard, saveCardDndChanges, switchCardList, removeCardFromSource } =
    useListsContext()

  const [boardOptions, setBoardOptions] = useState<IBoard[]>([])

  const [listOptions, setListOptions] = useState<IListItem[]>([])
  const [targetedList, setTargetedList] = useState<IListItem | undefined>()
  const [selected, setSelected] = useState<IMoveCardSettings>({
    boardId,
    listId,
    cardPosition: cardIndex,
  })

  const targetListHasOptions =
    listOptions !== undefined && !isEmpty(listOptions)
  const isOnSourceList = selected.listId === listId
  const isOnSourceBoard = selected.boardId === boardId
  const hasChangedTargetListOrBoard = !isOnSourceList || !isOnSourceBoard
  const hasChangedTargetListOnly = !isOnSourceList && isOnSourceBoard
  const targetListHasCards = !isEmpty(targetedList?.cards)
  const disableSelectFields =
    hasChangedTargetListOrBoard && !targetListHasOptions
  const targetListCardsSize = targetListHasCards
    ? targetedList?.cards?.length
    : undefined
  const cardOptions = targetListHasOptions
    ? targetListCardsSize === 0 ||
      (targetListHasOptions && !targetListCardsSize)
      ? 1
      : targetListCardsSize
    : undefined
  const defaultCardPosition = isOnSourceList
    ? selected.cardPosition
    : targetListHasCards
    ? targetListCardsSize + 1
    : 0

  const handleSelectedBoard = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value

    if (!id) return

    setSelected(prev => ({ ...prev, boardId: id, listId: targetedList.id }))
  }

  const handleSelectedList = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const id = ev.currentTarget?.value
    const [targetListCards] = findCardsByListId(id)
    const backToSource = listId === id

    setSelected(prev => ({
      ...prev,
      listId: id,
      cardPosition: backToSource
        ? targetListCards.length - 1
        : targetListCards.length + 1,
    }))
  }

  const handleSelectedPosition = (ev: ChangeEvent<HTMLSelectElement>) => {
    ev.stopPropagation()
    const value = ev.currentTarget?.value

    setSelected(prev => ({ ...prev, cardPosition: +value }))
  }

  const handleMove = () => {
    const targetCard = targetedList?.cards?.[selected.cardPosition]
    if (isOnSourceList) {
      moveCard(cardId, targetCard?.id)
      saveCardDndChanges({
        boardId,
        sourceCardId: cardId,
        sourceListId: listId,
        targetCardId: targetCard?.id,
      })
    }

    if (hasChangedTargetListOnly) {
      switchCardList(cardId, selected.listId)
      saveCardDndChanges({
        boardId,
        isSwitchingList: true,
        sourceCardId: cardId,
        sourceListId: listId,
        targetCardId: targetCard?.id || cardId,
        targetListId: selected.listId,
      })
    }

    if (!isOnSourceBoard) {
      console.log(targetCard?.id)

      removeCardFromSource(cardId)
      saveCardDndChanges({
        boardId,
        isSwitchingBoard: true,
        isSwitchingList: true,
        sourceCardId: cardId,
        sourceListId: listId,
        targetCardId: targetCard?.id || cardId,
        targetListId: isOnSourceList ? listOptions[0]?.id : selected.listId,
        targetBoardId: selected.boardId,
      })
    }

    setBoards([])
    setTargetedList(undefined)
    setSelected({ boardId: undefined, cardPosition: 0, listId: undefined })
    setBoardOptions([])
    setListOptions([])

    if (onClose) onClose()
  }

  useEffect(() => {
    setBoardOptions(boards)
  }, [boards])

  useEffect(() => {
    setListOptions(
      boardOptions?.find(board => board.id === selected.boardId)?.lists
    )
  }, [selected.boardId, boardOptions])

  useEffect(() => {
    setTargetedList(listOptions?.find(list => list.id === selected.listId))
  }, [selected.listId, listOptions])

  return (
    <MoveDialogStyles>
      <h4>Select Destination</h4>
      <div className="content-dialog">
        <MoveSetting
          heading="Board"
          className="board"
          onChange={handleSelectedBoard}
          value={selected.boardId}
        >
          {boardOptions?.map(item => (
            <option key={item.id} value={item.id}>
              {` ${item.title} ${boardId === item.id ? "(current)" : ""}`}
            </option>
          ))}
        </MoveSetting>

        <div className="setting-grid">
          <MoveSetting
            heading="List"
            className="list"
            onChange={handleSelectedList}
            value={selected.listId}
            disabled={!targetListHasOptions}
          >
            <>
              {!disableSelectFields &&
                listOptions?.map(item => (
                  <option id={item.id} key={item.id} value={item.id}>
                    {`${item.title} ${listId === item.id ? "(current)" : ""}`}
                  </option>
                ))}

              {disableSelectFields && (
                <option value="no-lists">No Lists</option>
              )}
            </>
          </MoveSetting>

          <MoveSetting
            heading="Position"
            className="position"
            onChange={handleSelectedPosition}
            value={defaultCardPosition}
            disabled={!cardOptions && !targetListHasOptions}
          >
            <>
              {!disableSelectFields &&
                times(cardOptions, index => {
                  return (
                    <option key={index} value={index}>
                      {`${index + 1} ${
                        !hasChangedTargetListOrBoard && cardIndex === index
                          ? "(current)"
                          : ""
                      }`}
                    </option>
                  )
                })}

              {disableSelectFields && <option value="no-cards">N/A</option>}
            </>
          </MoveSetting>
        </div>
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

export default MoveCardSettings
