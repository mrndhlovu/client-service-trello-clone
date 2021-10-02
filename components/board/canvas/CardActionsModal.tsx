import { Modal, ModalOverlay } from "@chakra-ui/modal"
import { AiOutlineClose } from "react-icons/ai"

import { ICardActionProps } from "./CardItem"

const CardActionsModal = ({
  actionsOpen,
  toggleActionsMenu,
}: ICardActionProps) => {
  return (
    <Modal size="full" isOpen={actionsOpen} onClose={toggleActionsMenu}>
      <ModalOverlay
        onClick={toggleActionsMenu}
        className="card-editor-overlay"
      />
      <AiOutlineClose
        size={22}
        className="card-actions-close-btn"
        onClick={toggleActionsMenu}
      />
    </Modal>
  )
}

export default CardActionsModal
