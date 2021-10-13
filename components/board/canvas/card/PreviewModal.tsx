import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { MouseEvent } from "react"

import { clientRequest } from "../../../../api"
import { useBoard, useCardContext } from "../../../../lib/providers"
import { NextLink } from "../../../shared"

const PreviewModal = () => {
  const { preview, togglePreviewModal, previewModalIsOpen } = useCardContext()
  const { setActivities } = useBoard()

  const handleAttachmentDelete = (ev?: MouseEvent) => {
    const previewId = ev.currentTarget.id

    setActivities(prev => [
      ...prev.filter(action => action?.entities?.attachment?.id !== previewId),
    ])

    clientRequest
      .deleteAttachment(previewId)
      .then(() => {
        togglePreviewModal()
      })
      .catch(() => {})
  }

  return previewModalIsOpen ? (
    <Modal isOpen={previewModalIsOpen} onClose={togglePreviewModal}>
      <ModalOverlay className="overlay-dark" />
      <ModalContent className="transparent-bg">
        <div className="preview-frame">
          <img src={preview.url} alt="preview" className="preview" />
        </div>
        <div className="preview-detail">
          <p className="meta">
            <span>
              <a href={preview.url} target="_blank">
                Open in new tab
              </a>
            </span>
            <span>
              <NextLink
                id={preview.id}
                onClick={handleAttachmentDelete}
                href="#"
              >
                Delete
              </NextLink>
            </span>
          </p>
        </div>
      </ModalContent>
    </Modal>
  ) : null
}

export default PreviewModal
