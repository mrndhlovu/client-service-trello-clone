import { ChangeEvent, FormEvent, useState } from "react"
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  Input,
  Modal,
  Select,
  Textarea,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { clientRequest } from "../../api"
import { ROUTES, WORKSPACE_TYPES } from "../../util/constants"
import StyleCreateWorkspace from "./StyleCreateWorkspace"
import { useGlobalState } from "../../lib/providers"

export interface IWorkspace {
  name: string
  category: string
  description: string
}

const INITIAL_STATE = {
  name: "",
  category: "",
  description: "",
}

const CreateWorkspaceModal = ({ toggleModal, openModal }) => {
  const router = useRouter()
  const { setWorkspaces } = useGlobalState()

  const [workspace, setWorkspace] = useState<IWorkspace>(INITIAL_STATE)

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setWorkspace(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  const handleContinue = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!workspace.name || !workspace.category) return
    clientRequest
      .createWorkspace(workspace)
      .then(res => {
        setWorkspaces(prev => [...prev, res.data])
        setWorkspace(INITIAL_STATE)
        router.push(ROUTES.home)
      })
      .catch(err => {})
  }

  return (
    <Modal onClose={toggleModal} isOpen={openModal}>
      <ModalCloseButton />
      <ModalOverlay className="new-board-overlay" />
      <StyleCreateWorkspace>
        <ModalBody>
          <form onSubmit={handleContinue} id="create-workspace-form">
            <span>Let's build a Workspace</span>
            <p>
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </p>
            <label htmlFor="name">
              Workspace name
              <Input
                onChange={handleChange}
                size="sm"
                name="name"
                placeholder="Study"
              />
            </label>

            <label htmlFor="category">
              Workspace type
              <Select onChange={handleChange} size="sm" name="category">
                <option>Choose...</option>

                {WORKSPACE_TYPES.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </Select>
            </label>
            <label htmlFor="description">
              Workspace description (Optional)
              <Textarea
                name="description"
                onChange={handleChange}
                placeholder="Our team organises everything here"
              />
            </label>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={!workspace.category || !workspace.name}
            form="create-workspace-form"
            isFullWidth
            type="submit"
          >
            Continue
          </Button>
        </ModalFooter>
      </StyleCreateWorkspace>
    </Modal>
  )
}

export default CreateWorkspaceModal
