import { Modal, ModalOverlay, ModalBody } from "@chakra-ui/react"
import { useCardContext } from "../../../../lib/providers"

import CardHeader from "./CardHeader"

import ModalStyles from "./ModalStyles"

interface IProps {
  isOpen: boolean
}

const CardModal = ({ isOpen }: IProps) => {
  const { closeCardModal } = useCardContext()
  return (
    <Modal
      scrollBehavior="outside"
      size="xl"
      isOpen={isOpen}
      onClose={closeCardModal}
    >
      <ModalOverlay />
      <ModalStyles>
        <CardHeader />
        <ModalBody>Context</ModalBody>
      </ModalStyles>
    </Modal>
  )
}

export default CardModal
