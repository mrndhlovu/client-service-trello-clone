import {
  ReactNode,
  ReactElement,
  useState,
  forwardRef,
  ForwardedRef,
  RefObject,
  Ref,
} from "react"
import styled from "styled-components"

import {
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react"

interface IProps {
  toggle: ReactElement
  children: ReactNode
  className?: string
  heading?: string
  handleClose?: () => void

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

const StyledPopOverContent = styled(PopoverContent)`
  border-radius: 3px;
  min-width: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    margin-bottom: 8px;
    position: relative;
    text-align: center;
    font-weight: 500;
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
    min-width: 400px;
  }

  .dropdown > span:first-child {
    z-index: -1;
  }
`

type ForwardRefElement = RefObject<HTMLInputElement | HTMLButtonElement>

const UIPopOver = forwardRef(
  (
    {
      toggle,
      children,
      className,
      heading,
      placement = "bottom",
      usePortal = false,

      handleClose,
    }: IProps,
    ref: ForwardRefElement
  ) => {
    return (
      <Popover
        initialFocusRef={ref}
        placement={placement}
        onClose={handleClose}
        closeOnBlur
      >
        <PopoverTrigger>{toggle}</PopoverTrigger>
        <UIPopOverPortal usePortal={usePortal}>
          <StyledPopOverContent
            className={`popover-content ${className || ""}`}
          >
            <PopoverHeader>{heading}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody className="dropdown-content">{children}</PopoverBody>
          </StyledPopOverContent>
        </UIPopOverPortal>
      </Popover>
    )
  }
)

const UIPopOverPortal = ({ children, usePortal }) => {
  return usePortal ? <Portal>{children}</Portal> : <>{children}</>
}

export { UIPopOver }
