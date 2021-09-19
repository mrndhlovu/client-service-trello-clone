import styled, { css } from "styled-components"

interface IBoardCoverProps {
  imageCover: string
  colorCover: string
  starred: boolean
}

export default styled.div`
  min-height: 300px;

  .board-group {
    overflow-anchor: none;
  }

  .group {
    margin-top: 10px;

    svg {
      margin-right: 10px;
    }

    &-header {
      ${props => props.theme.mixins.flex(undefined, "start", "center")};
      margin-bottom: 10px;

      h5 {
        font-size: 15px;
        color: ${props => props.theme.colors.body};
        font-weight: 600;
      }

      &-header-icon {
        margin-right: 15px;
      }
    }
  }
`

export const BoardItem = styled.div<IBoardCoverProps>`
  box-sizing: border-box;
  position: relative;
  margin: 0 4px 4px 0;
  height: 36px;
  display: flex;
  width: 100%;

  &:hover {
    .star {
      svg {
        transition: ${props => props.theme.variables.transition};
        transform: translateX(+0px);
      }
    }
  }

  .star {
    display: flex;
    transition-duration: 85ms;
    transition-property: width;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 36px;
    cursor: pointer;

    svg {
      color: ${props => (props.starred ? "#f2d600" : "#8e98aa")};
      box-shadow: none;
      padding: 0;
      margin: 8px 4px 8px 0;
      transform: ${props => (props.starred ? "0px" : "translateX(+37px)")};
    }
  }

  .board-item {
    display: flex;
    font-weight: 700;
    height: 36px;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    flex-grow: 2;

    &-title {
      display: flex;
      position: relative;
      flex: 1;
      width: 100%;
      padding: 9px 0 9px 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-direction: column;
      z-index: 1;
    }

    &-img {
      width: 36px;
      height: 36px;
      border-radius: 3px;

      ${props =>
        props?.imageCover
          ? css<IBoardCoverProps>`
              background-size: cover;
              background-color: ${props => props?.colorCover};
              background-image: url("${props => props?.imageCover}");
              background-position: center center;
              position: relative;
              transition: opacity 85ms;
              background-repeat: no-repeat;
              transition: opacity 85ms;
            `
          : css<IBoardCoverProps>`
              background-size: initial;
              background-position: left center;
              background-color: ${props => props?.colorCover};
            `};
    }
  }
`
