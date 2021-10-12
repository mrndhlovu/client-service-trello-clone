import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import { useState, MouseEvent } from "react"

import { BiCheck, BiLock, BiWorld } from "react-icons/bi"
import { clientRequest, IPasswordConfirmation } from "../../api"
import { IUpdateWorkspace } from "."
import { ROUTES, WORKSPACE_VISIBILITY_OPTIONS } from "../../util/constants"
import { UIDropdown } from "../shared"
import { useAuth, useGlobalState, Workspace } from "../../lib/providers"
import PasswordConfirmation from "../auth/PasswordConfirmation"

const Settings = ({ workspace }: { workspace: Workspace }) => {
  const { setWorkspaces } = useGlobalState()
  const { verifyUserPassword } = useAuth()
  const router = useRouter()

  const [activityVisibility, setActiveVisibility] = useState<string>(
    workspace?.visibility
  )

  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false)

  const handleDelete = async (formData: IPasswordConfirmation) => {
    const response = await verifyUserPassword(formData)

    if (!response) return

    clientRequest
      .deleteWorkspace(workspace.id)
      .then(() => {
        setWorkspaces(prev => [
          ...prev.filter(item => item.id !== workspace.id),
        ])
        router.push(ROUTES.home)
      })
      .catch(err => {})
  }

  const handleSelectedVisibility = (ev: MouseEvent) => {
    setActiveVisibility(ev.currentTarget.id)

    clientRequest
      .updateWorkspace(
        {
          visibility: ev.currentTarget.id as IUpdateWorkspace["visibility"],
        },
        workspace.id
      )
      .then(res => {
        setWorkspaces(prev => [
          ...prev.map(item => (item.id === res.data.id ? res.data : item)),
        ])
      })
      .catch(err => {})
  }

  const handleOnClick = () => setShowPasswordConfirmation(prev => !prev)

  return (
    <div className="option-container">
      <div className="item-container change-visibility">
        <p>Workspace visibility</p>
        <>
          {workspace?.visibility ? (
            <p className="description">
              <strong>{workspace?.visibility}</strong> - This Workspace is{" "}
              {workspace?.visibility}. It's not indexed or visible to those
              outside the Workspace.
            </p>
          ) : (
            <p className="description">
              <strong>{workspace?.visibility}</strong> - This Workspace is{" "}
              {workspace?.visibility}. It's visible to anyone with the link and
              will show up in search engines like Google. Only those invited to
              the Workspace can add and edit Workspace boards
            </p>
          )}

          <UIDropdown
            heading="Select Workspace visibility"
            className="visibility-btn"
            closeOnSelect={true}
            toggle={
              <span>
                <Button size="sm">Change</Button>
              </span>
            }
          >
            <div className="visibility-option">
              {WORKSPACE_VISIBILITY_OPTIONS.map(option => (
                <button
                  key={option.key}
                  id={option.key}
                  onClick={handleSelectedVisibility}
                  className="content link-btn"
                >
                  <div className="option-header">
                    <span className="icon-ws">
                      {option.key === "private" ? (
                        <BiLock className="icon-pvt" />
                      ) : (
                        <BiWorld className="icon-public" />
                      )}
                    </span>

                    <span>{option.title}</span>

                    <span>
                      {option.key === activityVisibility && (
                        <BiCheck size={18} />
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="description-detail">
                      {option.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </UIDropdown>
        </>
      </div>
      <div className="item-container delete-workspace">
        <p>Delete workspace</p>

        {showPasswordConfirmation ? (
          <PasswordConfirmation
            handleClick={handleDelete}
            buttonText="Yes delete workspace"
          />
        ) : (
          <div>
            <Button
              disabled={workspace?.category === "default"}
              size="sm"
              onClick={handleOnClick}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { Settings }
