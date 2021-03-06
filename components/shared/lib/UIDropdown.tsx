import { ReactNode, ReactElement } from "react"
import styled from "styled-components"

import { Divider, Menu, MenuButton, MenuList, Portal } from "@chakra-ui/react"

interface IProps {
  toggle: ReactElement
  children: ReactNode
  className?: string
  heading?: string
  closeOnSelect?: boolean
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end"
  usePortal?: boolean
}

const StyledMenu = styled(Menu)`
  width: fit-content;
`

const StyledMenuContent = styled(MenuList)`
  border-radius: 3px;
  min-width: 300px;
  max-width: 300px;
  z-index: 50;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    margin-bottom: 8px;
    padding: 0 12px;
    position: relative;
    text-align: center;
    font-weight: 500;

    div {
      color: #172b4d;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #5e6c84;
      height: 40px;
      display: block;
      line-height: 40px;
      margin: 0;
      overflow: hidden;
      padding: 0 32px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      grid-column: 1 / span 3;
      grid-row: 1;
    }
  }

  .dropdown-item {
    font-size: 1rem;
    color: ${props => props.theme.colors.bgDark};
    font-weight: 500;
    color: #5e6c84;
    font-size: 14px;
  }

  .dropdown-content {
    padding: 10px;
  }

  .dropdown > span:first-child {
    z-index: -1;
  }
`

const DropdownHeader = styled.h6``

const UIDropdown = ({
  toggle,
  children,
  className,
  heading,
  placement = "bottom",
  usePortal = false,
  closeOnSelect = false,
}: IProps) => {
  return (
    <StyledMenu closeOnSelect={closeOnSelect} placement={placement}>
      <MenuButton className={`dropdown ${className || ""}`}>
        {toggle}
      </MenuButton>

      <UIDropdown.Wrapper usePortal={usePortal}>
        <StyledMenuContent>
          <header>
            <DropdownHeader>{heading}</DropdownHeader>
          </header>
          <Divider />
          <div className="dropdown-content">{children}</div>
        </StyledMenuContent>
      </UIDropdown.Wrapper>
    </StyledMenu>
  )
}

UIDropdown.Wrapper = ({
  usePortal,
  children,
}: {
  usePortal: IProps["usePortal"]
  children: IProps["children"]
}) => (usePortal ? <Portal>{children}</Portal> : <>{children}</>)

export { UIDropdown }
