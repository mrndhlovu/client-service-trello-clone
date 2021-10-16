import { Button } from "@chakra-ui/button"
import { AiOutlinePlus } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { HOME_SIDEBAR_PRIMARY } from "../../../util/constants"
import { NextLink } from "../../shared"
import { useGlobalState } from "../../../lib/providers"
import SideBarStyles from "./SideBarStyles"
import TabIcon from "./TabIcon"
import WorkspaceAccordion from "./WorkspaceAccordion"
import CreateWorkspaceModal from "../../header/CreateWorkspaceModal"

const NavSidebar = () => {
  const { darkMode, workspaces } = useGlobalState()
  const { pathname } = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string>("/boards")

  const toggleModal = () => setModalIsOpen(prev => !prev)

  useEffect(() => {
    setActive(pathname)
  }, [pathname])

  return (
    <SideBarStyles>
      <nav className={`sb ${darkMode ? "sb-dark" : ""}`}>
        <div className="sb-primary">
          <ul>
            {HOME_SIDEBAR_PRIMARY.map(option => (
              <li
                className={`sb-link-item  ${
                  active === option.link ? "active" : ""
                }`}
                key={option.key}
              >
                <NextLink id={option.key} href={option?.link}>
                  <span className="sb-link-item-icon">
                    <TabIcon icon={option.key} />
                  </span>
                  <strong>{option.title}</strong>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
        <ul className="sb-secondary">
          <div className="workspace-header">
            <div>Workspaces</div>
            <div>
              <Button onClick={toggleModal} className="link-btn" size="xs">
                <AiOutlinePlus size={16} />
              </Button>
            </div>
          </div>
          {workspaces?.map(workspace => (
            <WorkspaceAccordion key={workspace.id} workspace={workspace} />
          ))}
        </ul>
      </nav>
      {modalIsOpen && (
        <CreateWorkspaceModal
          toggleModal={toggleModal}
          openModal={modalIsOpen}
        />
      )}
    </SideBarStyles>
  )
}

export default NavSidebar
