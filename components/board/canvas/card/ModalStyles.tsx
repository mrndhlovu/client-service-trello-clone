import { ModalContent } from "@chakra-ui/react"
import styled from "styled-components"

export default styled(ModalContent)`
  border-radius: 3px;
  max-width: 768px;

  .card-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`
