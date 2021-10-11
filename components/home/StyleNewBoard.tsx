import { Modal } from "@chakra-ui/modal"
import styled from "styled-components"

interface IStyledModalProps {
  image?: string
  color?: string
}

export default styled.div<IStyledModalProps>`
  height: 105px;
  position: relative;
  ${props => props?.theme.mixins.flex("row", "space-between")};

  .board-bg-options {
    max-width: 120px;
    display: flex;

    .board-bg-colors {
      display: flex;
      flex-wrap: wrap;
      width: 126px;
    }
  }

  ul {
    padding-left: 10px;
  }

  li {
    list-style: none;
  }

  .input-wrapper {
    position: relative;
    background-color: ${props => props?.color};
    background-image: url("${props => props?.image}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 10px;
    border-radius: 2px;
    width: 295px;
    height: 96px;
    position: relative;
    place-self: flex-start;

    input {
      border: none !important;
      background: transparent !important;
      box-shadow: none;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      left: -8px;
      padding: 0px 8px;
      position: relative;
      width: calc(100% - 18px - 16px);
      height: 33px;

      &:hover {
        background: rgba(255, 255, 255, 0.15) !important;
      }
    }

    .icon-wrapper {
      color: #fff;
      float: right;
      position: relative;
      right: -2px;
      top: -2px;
    }

    &::before {
      background: rgba(0, 0, 0, 0.15);
      position: absolute;
      bottom: 0;
      content: "";
      display: block;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 3px;
      z-index: 0;
    }
  }
`

export const BoardBgOption = styled.div<IStyledModalProps>`
  background-color: ${props => props?.color};
  background-image: url("${props => props?.image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  position: relative;
  margin: 3px;

  svg {
    ${props => props.theme.styles.absoluteCenter};
    color: #fff;
  }
`

export const StyledModal = styled(Modal)`
  height: 100%;
  width: 100%;

  .modal-dialog {
    height: 100%;
    width: 100%;
  }

  .modal-content {
    border: none;
    background-color: transparent;
    border-radius: 3px;
    z-index: 10000;
  }
`
