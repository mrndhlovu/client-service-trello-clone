import { Button, Menu, MenuItem, Textarea } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { useListCardsContext } from "../../../lib/providers"

interface IProps {
  title: string
  close: () => void
  listId: string
  cardId: string
}

const EditCardMenu = ({ title, close, cardId, listId }: IProps) => {
  const { saveCardChanges } = useListCardsContext()
  const [newTitle, setNewTitle] = useState<string>("")

  const handleArchiveCard = () => {
    saveCardChanges(cardId, listId, { archived: true })
    close()
  }

  const handleSave = () => {
    if (newTitle && newTitle !== title) {
      saveCardChanges(cardId, listId, { title: newTitle })
      close()
    }
  }

  const handleChange = (ev: ChangeEvent<HTMLElement>) => {
    setNewTitle((ev.target as any).value)
  }

  const CARD_ACTIONS = [
    {
      handleClick: handleArchiveCard,
      key: "archive-car",
      title: "Archive card",
    },
  ]

  return (
    <div className="card-editor">
      <div>
        <Textarea onChange={handleChange} defaultValue={title} />

        <div>
          <Button size="sm" onClick={handleSave} colorScheme="green">
            Save
          </Button>
          <AiOutlineClose className="close-button" onClick={close} />
        </div>
      </div>
      <div>
        <Menu>
          {CARD_ACTIONS.map(action => (
            <MenuItem onClick={action.handleClick} key={action.key}>
              {action.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default EditCardMenu
