import { ChangeEvent, useEffect, useState } from "react"
import { Button, Textarea } from "@chakra-ui/react"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"

import { clientRequest } from "../../../api"
import { getErrorMessage } from "../../../util"
import { useBoard, useGlobalState } from "../../../lib/hooks/context"
import { IListItem } from "./ListItem"
import { isEmpty } from "lodash"

interface IProps {
  listId: string
}

const AddCard = ({ listId }: IProps) => {
  const { board, setActiveBoard } = useBoard()
  const { notify } = useGlobalState()

  const [editing, setEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(ev.target.value)
  }

  const handleSave = async () => {
    if (!title) return
    const cards = board.cards.filter(
      (card: IListItem) => card.listId === listId
    )

    const hasCards = !isEmpty(cards)
    const newCardPosition = hasCards ? cards[cards.length - 1].position + 1 : 0

    await clientRequest
      .createCard(
        { title, position: newCardPosition },
        { boardId: board.id, listId }
      )
      .then(res => {
        setActiveBoard(res.data)
        toggleAddInput()
      })
      .catch(err => {
        notify({
          description: getErrorMessage(err.response.data),
          placement: "top",
          status: "error",
        })
      })
  }

  const toggleAddInput = () => setEditing(prev => !prev)

  useEffect(() => {
    return () => {
      setTitle("")
    }
  }, [])

  return (
    <div className="create-card">
      <div>
        {editing ? (
          <div className="create-card-wrapper">
            <Textarea
              placeholder="Enter a title for this card..."
              defaultValue={title}
              onChange={handleChange}
              size="sm"
            />
            <div className="c-flex card">
              <Button size="sm" colorScheme="blue" onClick={handleSave}>
                Add card
              </Button>
              <AiOutlineClose
                cursor="pointer"
                onClick={toggleAddInput}
                size={20}
              />
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={toggleAddInput}
            leftIcon={<AiOutlinePlus />}
            isFullWidth
            className="add-card-button"
          >
            Add a card
          </Button>
        )}
      </div>
    </div>
  )
}

export default AddCard
