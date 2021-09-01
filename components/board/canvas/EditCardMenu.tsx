import { ChangeEvent, useState } from "react"
import {
  AiFillSwitcher,
  AiOutlineClose,
  AiOutlineIdcard,
  AiOutlineTag,
} from "react-icons/ai"

import { Button, Menu, MenuItem, Textarea } from "@chakra-ui/react"

import { useListCardsContext } from "../../../lib/providers"
import { CgCreditCard } from "react-icons/cg"

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
      handleClick: () => {},
      key: "open-card",
      title: "Open card",
      icon: <CgCreditCard />,
    },
    {
      handleClick: () => {},
      key: "change-cover",
      title: "Change cover",
      icon: <AiOutlineIdcard />,
    },
    {
      handleClick: () => {},
      key: "edit-labels",
      title: "Edit labels",
      icon: <AiOutlineTag />,
    },

    {
      handleClick: handleArchiveCard,
      key: "archive-car",
      title: "Archive",
      icon: <AiFillSwitcher />,
    },
  ]

  return (
    <div className="card-editor">
      <div className="card-editor-content">
        <Textarea onChange={handleChange} defaultValue={title} />
      </div>
      <div className="action-buttons">
        <Button size="sm" onClick={handleSave} colorScheme="blue">
          Save
        </Button>
        <AiOutlineClose size={22} className="close-button" onClick={close} />
      </div>
      <div className="action-options">
        <Menu>
          {CARD_ACTIONS.map(action => (
            <MenuItem
              icon={action.icon}
              onClick={action.handleClick}
              key={action.key}
            >
              {action.title}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default EditCardMenu
