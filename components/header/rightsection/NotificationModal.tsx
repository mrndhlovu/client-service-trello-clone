import { MouseEvent } from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react"

import { INotification } from "../../../lib/providers"

const NotificationModal = ({
  isOpen,
  onClose,
  handleDelete,
  toggleReadStatus,
  selectedMessage,
}: {
  isOpen: boolean
  onClose: () => void
  handleDelete: (ev: MouseEvent) => void
  toggleReadStatus: (ev: MouseEvent) => void
  selectedMessage: INotification
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedMessage.subject}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{selectedMessage.body}</ModalBody>

        <ModalFooter>
          <Button
            id={selectedMessage.id}
            colorScheme="blue"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            id={selectedMessage.id}
            size="sm"
            onClick={toggleReadStatus}
            variant="ghost"
          >
            {selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NotificationModal
