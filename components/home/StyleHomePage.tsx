import { Box } from "@chakra-ui/react"
import styled from "styled-components"

export default styled(Box)`
  margin-bottom: 100px;

  h5 {
    font-size: 15px;
    color: ${props => props.theme.colors.body};
    font-weight: 600;
    margin-bottom: 15px;
  }

  .home-boards-group-text {
    margin-bottom: 0;
  }

  .home {
    &-boards-group {
      padding-bottom: 26px;
    }

    &-group-header {
      ${props => props.theme.mixins.flex(undefined, "start", "center")};
      margin-bottom: 10px;
      align-items: inherit;

      .home-group-header-icon {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
    }
  }
`
