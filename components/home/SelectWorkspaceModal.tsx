import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

import { clientRequest } from "../../api"
import { ITemplate, useGlobalState } from "../../lib/providers"
import { ROUTES } from "../../util/constants"

import SelectWorkspace from "../header/rightsection/SelectWorkspace"

const SelectWorkspaceModal = ({
  isOpen,
  onClose,
  selectedTemplate,
}: {
  selectedTemplate: ITemplate
  isOpen: boolean
  onClose: () => void
}) => {
  const { notify, workspaces } = useGlobalState()
  const router = useRouter()
  const [workspace, setWorkspace] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setWorkspace(ev.target.value)
  }

  const handleUseTemplate = () => {
    setIsLoading(true)
    const selectedWorkspace = workspaces.find(item => item.id === workspace)
    notify({ description: "Processing...", duration: 6000 })

    const data = {
      title: selectedTemplate.name,
      workspaceId: selectedWorkspace?.id,
      activeBg: selectedTemplate?.bgImage ? "image" : "color",
      prefs: {
        color: selectedTemplate?.bgColor,
        image: selectedTemplate?.bgImage,
      },
      templateLists: selectedTemplate.lists,
    }

    clientRequest
      .createNewBoard(data)
      .then(res => router.push(`/${ROUTES.board}/${res?.data?.id}`))
      .catch(err => {})
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content">
        <ModalHeader>Select workspace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SelectWorkspace
            handleCreate={handleUseTemplate}
            handleChange={handleChange}
            selectedTemplate={selectedTemplate}
            isLoading={isLoading}
            disabled={!!workspace}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectWorkspaceModal
