import styled from "styled-components"

import { Dropdown } from "react-bootstrap"

const StyledDropdown = styled(Dropdown)`
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

  .dropdown-toggle {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;

    &::after {
      display: none;
    }
  }
`

const UIDropdown = ({ toggle, children, className, heading }) => {
  return (
    <StyledDropdown className={className}>
      <Dropdown.Toggle className={className ? `${className}-toggle` : "toggle"}>
        {toggle}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <header>
          <Dropdown.Header>{heading}</Dropdown.Header>
        </header>
        <Dropdown.Divider />

        {children}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}

export { UIDropdown }
