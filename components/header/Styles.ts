import styled from "styled-components"

interface IHeaderProps {
  activeBoardColor?: string
}

export default styled.header<IHeaderProps>`
  background-color: ${({ activeBoardColor, theme }) =>
    activeBoardColor || theme.colors.trello};
  z-index: 100;
  display: flex;
  justify-content: space-between;
  max-height: 37px;
`
