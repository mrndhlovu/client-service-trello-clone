import { Button } from "@chakra-ui/button"
import { AiOutlinePlus } from "react-icons/ai"
import { MouseEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"

import {
  HOME_SIDEBAR_PRIMARY,
  ROUTES,
  TEMPLATE_CATEGORIES,
} from "../../../util/constants"
import { NextLink } from "../../shared"
import { useGlobalState } from "../../../lib/providers"
import SideBarStyles from "./SideBarStyles"
import TabIcon from "./TabIcon"
import WorkspaceAccordion from "./WorkspaceAccordion"
import CreateWorkspaceModal from "../../header/CreateWorkspaceModal"

const NavSidebar = () => {
  const { darkMode, workspaces } = useGlobalState()
  const { push, asPath } = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string | undefined>("/boards")

  const isTemplatePage = asPath.indexOf("templates") !== -1

  const toggleModal = () => setModalIsOpen(prev => !prev)

  const handleClick = (ev: MouseEvent) => {
    push(`/${ROUTES.templates}/${ev.currentTarget.id}`)
  }

  useEffect(() => {
    setActive(asPath.split("/")?.[1] || "boards")
  }, [asPath])

  return (
    <SideBarStyles>
      <nav className={`sb ${darkMode ? "sb-dark" : ""}`}>
        <div className="sb-primary">
          <ul>
            {HOME_SIDEBAR_PRIMARY.map(option => (
              <li
                className={`sb-link-item  ${
                  option.key.indexOf(active) !== -1 ? "active" : ""
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

          {isTemplatePage && (
            <ul className="template-list">
              {TEMPLATE_CATEGORIES.map(item => (
                <li
                  className={`template-list-item ${
                    asPath.indexOf(item.key) !== -1 ? "active sub-item" : ""
                  }`}
                  key={item.key}
                >
                  <button
                    className="link-btn"
                    id={item.key}
                    onClick={handleClick}
                  >
                    {item.description}
                  </button>
                </li>
              ))}
            </ul>
          )}
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
