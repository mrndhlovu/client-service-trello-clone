import React from "react"
import styled from "styled-components"

import { BsMoon, BsSun } from "react-icons/bs"

import { useGlobalState } from "../../lib/hooks/context"

const Container = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  .icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    margin-right: 5px;
    svg {
      fill: ${props => props.theme.colors.amazon};

      & > * {
        fill: ${props => props.theme.colors.amazon};
      }
    }
  }

  .light-mode-switch {
    display: inline-block;
    height: 20px;
    width: 40px;
    background: #fff;
    border-radius: 100px;
    position: relative;
    vertical-align: middle;
    border: 0;

    &::after {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      height: 16px;
      width: 16px;
      border-radius: 100px;
      background: ${props => props.theme.colors.amazon};
      transition: ${props => props.theme.variables.transition};
    }

    &.active {
      &::after {
        left: 22px;
        background: ${props => props.theme.colors.primary};
      }
    }
  }
`

const ModeSwitch = () => {
  const { lightMode, handleModeChange } = useGlobalState()

  return (
    <Container className="light-mode">
      <span className={`icon icon-${lightMode ? "light" : "dark"}`}>
        <span>{lightMode ? <BsMoon /> : <BsSun />}</span>
      </span>
      <button
        className={lightMode ? "light-mode-switch active" : "light-mode-switch"}
        onClick={handleModeChange}
      />
    </Container>
  )
}

export default ModeSwitch
