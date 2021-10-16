import { IoIosArrowDown } from "react-icons/io"

import { NextLink, UIDropdown } from "../../shared"
import { ROUTES } from "../../../util/constants"
import { TitleIcon } from "../../home/BoardsGroup"
import { useGlobalState } from "../../../lib/providers"
import HeaderBoardStyles from "./HeaderBoardStyles"

const HeaderWorkspaceDropdown = () => {
  const { workspaces } = useGlobalState()

  return (
    <UIDropdown
      className="header-board-dropdown-button"
      heading="Workspaces"
      toggle={
        <div className="header-board-button">
          <span className="header-board-text">Workspaces</span>
          <span>
            <IoIosArrowDown />
          </span>
        </div>
      }
    >
      <HeaderBoardStyles>
        <ul className="sb-secondary">
          {workspaces?.map(workspace => (
            <NextLink
              className="workspace-header"
              href={`/${ROUTES.workspace}/${workspace.id}/edit`}
              key={workspace.id}
            >
              <TitleIcon
                iconColor={workspace.iconColor}
                className="toggle-button-icon"
              >
                <span>{workspace?.name?.split("")?.[0]}</span>
              </TitleIcon>
              <strong>{workspace.name}</strong>
            </NextLink>
          ))}
        </ul>
      </HeaderBoardStyles>
    </UIDropdown>
  )
}

export default HeaderWorkspaceDropdown
