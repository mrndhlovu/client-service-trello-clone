import { Menu, MenuItem, MenuItemOption } from "@chakra-ui/react"
import { MouseEvent } from "react"
import { AiFillSwitcher, AiOutlineIdcard, AiOutlineTag } from "react-icons/ai"
import { CgCreditCard } from "react-icons/cg"

import { useCardContext, useListItemContext } from "../../../../lib/providers"
import { UIDropdown } from "../../../shared"
import CardLabels from "./CardLabels"
import ChangeCover from "./ChangeCover"

interface IProps {
  cardId: string
  listId: string
  close: () => void
}

const CardActions = ({ listId, cardId, close }: IProps) => {
  const { saveCardChanges } = useListItemContext()
  const { toggleCardIsOpen } = useCardContext()

  const handleArchiveCard = (ev: MouseEvent) => {
    ev.preventDefault()
    saveCardChanges(cardId, listId, { archived: true })
    close()
  }

  const CARD_ACTIONS = [
    {
      handleClick: (ev: MouseEvent) => {
        close()
        toggleCardIsOpen(ev, cardId)
      },
      key: "open-card",
      title: "Open card",
      icon: <CgCreditCard />,
      button: true,
    },
    {
      handleClick: () => {},
      key: "change-cover",
      title: "Change cover",
      icon: <AiOutlineIdcard />,
      content: <ChangeCover />,
    },
    {
      handleClick: () => {},
      key: "edit-labels",
      title: "Edit labels",
      icon: <AiOutlineTag />,
      content: <CardLabels />,
    },

    {
      handleClick: handleArchiveCard,
      key: "archive-car",
      title: "Archive",
      icon: <AiFillSwitcher />,
      button: true,
    },
  ]

  return (
    <div className="card-action-options">
      <Menu>
        {CARD_ACTIONS.map(action => (
          <span key={action.key}>
            {action?.button ? (
              <MenuItemOption icon={action.icon} onClick={action.handleClick}>
                {action.title}
              </MenuItemOption>
            ) : (
              <UIDropdown
                heading={action.title}
                toggle={
                  <MenuItem icon={action.icon} onClick={action.handleClick} si>
                    {action.title}
                  </MenuItem>
                }
              >
                {action?.content}
              </UIDropdown>
            )}
          </span>
        ))}
      </Menu>
    </div>
  )
}

export default CardActions
