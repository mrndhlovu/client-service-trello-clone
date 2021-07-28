import styled from "styled-components"

export default styled.div`
  .home-all-boards {
    margin: 0 16px 0;
  }

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

    &-boards-group-list {
      ${props => props.theme.mixins.flex(undefined, "flex-start")};
      flex-wrap: wrap;
      width: 100%;
      padding-left: 0;
    }
  }
`
