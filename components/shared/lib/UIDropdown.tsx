import { ReactNode, ReactElement } from "react"
import styled from "styled-components"

import { Divider, Menu, MenuButton, MenuList } from "@chakra-ui/react"

interface IProps {
  toggle: ReactElement
  children: ReactNode
  className?: string
  heading?: string
}

const StyledMenu = styled(Menu)`
  width: fit-content;
  .dropdown-menu {
    min-width: 350px;
  }

  header {
    margin-bottom: 8px;
    padding: 0 12px;
    position: relative;
    text-align: center;
    display: grid;
    grid-template-columns: 12px 1fr 12px;

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
`

const DropdownHeader = styled.h6``

const UIDropdown = ({ toggle, children, className, heading }: IProps) => {
  return (
    <StyledMenu>
      <MenuButton className={`dropdown ${className}`}>{toggle}</MenuButton>
      <MenuList>
        <header>
          <DropdownHeader>{heading}</DropdownHeader>
        </header>
        <Divider />

        {children}
      </MenuList>
    </StyledMenu>
  )
}

export { UIDropdown }
