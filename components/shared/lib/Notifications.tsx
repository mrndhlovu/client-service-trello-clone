import React from "react"
import styled from "styled-components"

import { FiX } from "react-icons/fi"
import { useGlobalState } from "../../../lib/hooks/context"

interface IAlertBoxProps {
  variant: string
}

const Container = styled.div`
  min-width: 20vw;
  position: fixed;
  margin-bottom: 15px;
  z-index: 1000;

  &.top-left {
    left: 12px;
    top: 12px;
  }

  &.top-right {
    right: 12px;
    top: 12px;
  }

  &.top-center {
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
  }

  &.bottom-left {
    left: 12px;
    bottom: 12px;
  }

  &.bottom-right {
    right: 12px;
    bottom: 12px;
  }

  &.bottom-center {
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
  }
`

const AlertBox = styled.div<IAlertBoxProps>`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  min-width: 40vw;
  position: relative;

  background-color: ${props => {
    switch (props.variant) {
      case "danger":
        return props.theme.colors?.google

      case "success":
        return props.theme.colors?.delicious
      default:
        return props.theme.colors?.bitbucket
    }
  }};

  span {
    color: #fff;
  }

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }

  @media ${props => props.theme.device.tablet} {
    min-width: 80vw;
  }

  @media ${props => props.theme.device.mobileLg} {
    min-width: 90vw;
  }
`

const Notifications = () => {
  const { notifications, dismissNotification } = useGlobalState()

  return (
    <Container className={`mi-alert-container ${notifications?.placement}`}>
      {notifications?.list.map((message, index) => (
        <AlertBox
          key={index}
          variant={message?.severity}
          className="mi-alert-box"
        >
          <span>{message.text}</span>
          <FiX
            cursor="pointer"
            onClick={() => dismissNotification(message?.id)}
          />
        </AlertBox>
      ))}
    </Container>
  )
}

export { Notifications }
