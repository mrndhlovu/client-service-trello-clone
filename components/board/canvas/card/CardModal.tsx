import { Modal, ModalOverlay, ModalBody } from "@chakra-ui/react"
import { MouseEvent } from "react"

import AddToCardOptions from "./AddToCardOptions"
import CardActivity from "./CardActivity"
import CardAttachments from "./CardAttachments"
import CardChecklists from "./CardChecklists"
import CardDescription from "./CardDescription"
import CardDueDate from "./CardDueDate"
import CardHeader from "./CardHeader"
import CardLabelModule from "./CardLabelModule"
import ModalCardActions from "./ModalCardActions"
import StyleModal from "./StyleModal"

interface IProps {
  isOpen: boolean
  onClose: (ev?: MouseEvent) => void
}

const CardModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal scrollBehavior="outside" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay zIndex="-moz-initial" />
      <StyleModal className="card-modal-content">
        <CardHeader onClose={onClose} />
        <ModalBody className="card-modal-detail">
          <div className="card-content-column">
            <CardDueDate />
            <CardLabelModule />
            <CardDescription />
            <CardAttachments />
            <CardChecklists />
            <CardActivity />
          </div>
          <div className="card-sidebar">
            <AddToCardOptions />
            <ModalCardActions />
          </div>
        </ModalBody>
      </StyleModal>
    </Modal>
  )
}

export default CardModal
