import { Box } from "@chakra-ui/react"
import styled from "styled-components"

export default styled(Box)`
  .home {
    &-group-header {
      ${props => props.theme.mixins.flex(undefined, "start", "end")};

      h5 {
        font-size: 15px;
        color: ${props => props.theme.colors.body};
        font-weight: 600;
      }

      .home-group-header-icon {
        margin-right: 15px;
      }
    }
  }
`
