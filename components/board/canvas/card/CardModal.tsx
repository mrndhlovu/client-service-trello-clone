import { Modal, ModalOverlay, ModalBody } from "@chakra-ui/react"
import { MouseEvent } from "react"

import AddToCardOptions from "./AddToCardOptions"
import CardActivity from "./CardActivity"
import CardChecklists from "./CardChecklists"
import CardDescription from "./CardDescription"
import CardHeader from "./CardHeader"
import CardLabelModule from "./CardLabelModule"
import ModalCardActions from "./ModalCardActions"
import ModalStyles from "./StyleModal"

interface IProps {
  isOpen: boolean
  onClose: (ev?: MouseEvent) => void
}

const CardModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal scrollBehavior="outside" size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay zIndex="-moz-initial" />
      <ModalStyles>
        <CardHeader onClose={onClose} />
        <ModalBody className="card-modal-detail">
          <div className="card-content-column">
            <CardLabelModule />
            <CardDescription />
            <CardChecklists />
            <CardActivity />
          </div>
          <div className="card-sidebar">
            <AddToCardOptions />
            <ModalCardActions />
          </div>
        </ModalBody>
      </ModalStyles>
    </Modal>
  )
}

export default CardModal
