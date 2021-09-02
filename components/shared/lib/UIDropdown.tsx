import { ReactNode, ReactElement } from "react"
import styled from "styled-components"

import { Divider, Menu, MenuButton, MenuList, Portal } from "@chakra-ui/react"

interface IProps {
  toggle: ReactElement
  children: ReactNode
  className?: string
  heading?: string
  toggleSize?: string
}

const StyledMenu = styled(Menu)`
  width: fit-content;
  z-index: 100;
`

const StyledMenuContent = styled(MenuList)`
  border-radius: 2px;
  min-width: 300px;

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
`

const DropdownHeader = styled.h6``

const UIDropdown = ({
  toggle,
  children,
  className,
  heading,
  toggleSize,
}: IProps) => {
  return (
    <StyledMenu>
      <MenuButton className={`dropdown ${className || ""}`}>
        {toggle}
      </MenuButton>
      <Portal>
        <StyledMenuContent>
          <header>
            <DropdownHeader>{heading}</DropdownHeader>
          </header>
          <Divider />
          <div className="dropdown-content">{children}</div>
        </StyledMenuContent>
      </Portal>
    </StyledMenu>
  )
}

export { UIDropdown }
