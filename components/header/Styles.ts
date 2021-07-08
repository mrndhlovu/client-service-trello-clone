import styled from "styled-components"

interface IHeaderProps {
  activeBoardColor?: string
}

export default styled.header<IHeaderProps>`
  background-color: ${({ activeBoardColor, theme }) =>
    activeBoardColor || theme.colors.trello};
  z-index: 100;
  height: 37px;

  .header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    padding: 8px 3px;

    &-left-content {
      height: 100%;
      width: 100%;
    }

    &-logo-content {
      width: 100%;
      display: flex;
      place-items: center;

      a {
        cursor: pointer;
      }
    }

    &-logo-text {
      position: absolute;
      font-weight: 700;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &-right-content {
      height: 100%;
      width: 100%;
    }

    &-left-icon-wrapper {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      display: flex;
      place-items: center;
    }

    &-right-icon-wrapper {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      display: flex;
      gap: 5px;
      place-items: center;
    }

    &-auth-button {
      background-color: ${props => props.theme.colors.whatsapp};
      border-radius: 50%;
      position: relative;
      outline: 0;
      border: none;
      height: 30px;
      width: 30px;
    }

    &-button-text {
      font-size: 1rem;
      color: ${props => props.theme.colors.bgDark};
      position: absolute;
      font-weight: 500;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &-board-button {
      border-radius: 3px;
      border: 0;
      text-decoration: none;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: none;
      color: #ffffff;
      display: flex;
      font-weight: bold;
      height: 32px;
      line-height: 32px;
      margin: 0 4px 0 0;
      padding: 0;
      white-space: nowrap;
      width: 90px;
      padding: 0 8px;
      gap: 8px;

      svg {
        font-size: 20px;
      }
    }

    &-button {
      border-radius: 3px;
      border: 0;
      text-decoration: none;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: none;
      color: #ffffff;
      display: flex;
      font-weight: bold;
      height: 32px;
      width: 32px;
      line-height: 32px;
      margin: 0 4px 0 0;
      padding: 0;
      white-space: nowrap;

      span {
        display: flex;
        width: 32px;
        justify-content: center;
        align-items: center;
        margin: 0;
      }

      svg {
        font-size: 20px;
      }
    }
  }
`
