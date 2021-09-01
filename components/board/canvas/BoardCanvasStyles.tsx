import styled from "styled-components"

export default styled.div`
  height: 100%;
  width: 100%;

  .content {
    ${props => props.theme.mixins.flex("row", "flex-start", "baseline")};
    height: 99%;
    width: 100%;
    padding: 0 5px;
    overflow-x: scroll;
    min-width: 100vw;

    .list-wrapper {
      margin-left: 8px;
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      margin: 0 4px;
      vertical-align: top;
      white-space: nowrap;
      width: 272px;
      position: relative;

      .foreign-card-dnd-zone {
        height: inherit;
        width: inherit;
        overflow-y: auto;
        transform: "translate3d(0, 0, 0)";
      }
    }

    .list-content {
      position: relative;
    }

    .editable-header {
      ${props => props.theme.mixins.flex("row", "space-between")};
      flex: 1 1 auto;
      margin: 0 4px 4px;
      min-height: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 2px 4px 0;
      z-index: 1;

      & button {
        justify-content: end;
      }

      .edit-title-button {
        background-color: transparent;
      }

      button:last-child {
        &:hover {
          background-color: #0000000d;
        }
      }
    }

    .drag-placeholder,
    .list-item {
      background-color: #ebecf0;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      height: max-content;
      position: relative;
      white-space: normal;
      width: 272px;
      transform: rotate3d(0, 0, 0);

      button {
        border: none;
      }
    }

    .card-drag-placeholder,
    .drag-placeholder {
      background-color: #6b6b6b6b;

      div {
        opacity: 0;
      }
    }

    .create-card,
    .create-list {
      vertical-align: top;
      white-space: nowrap;
      width: 100%;

      input {
        height: 32px;
      }
      button {
        border-radius: 3px;
        font-weight: lighter;
        justify-content: end;
      }
    }

    .create-list {
      max-height: 76px;
      height: 100%;
      position: relative;

      &-content {
        height: 100%;
        button {
          padding: 0 9px;
        }
      }
    }

    .create-card {
      min-width: 256px;
      max-width: 256px;
      margin: 0 4px 4px 8px;

      textarea {
        background-color: #fff;
        ${props => props.theme.styles.cardBoxShadow};
      }

      .add-card-button {
        background-color: transparent;
      }
    }

    .create-button {
      border-radius: 3px;
      border: 0;
      text-decoration: none;
      background-color: #cccccc21 !important;
      box-shadow: none;
      color: #ffffff;
      width: 100%;
      font-weight: lighter;
      height: 35px;
      line-height: 32px;
      white-space: nowrap;

      svg {
        color: #ffffff;
      }
    }

    .create-card-buttons {
      color: ${props => props.theme.colors.border};

      svg {
        color: ${props => props.theme.colors.border};
      }

      button {
        font-size: 13px;
      }
    }

    .create-card-wrapper,
    .create-list-wrapper {
      background-color: #ebecf0;
      ${props => props.theme.mixins.flex("column", "space-evenly", "end")};
      gap: 7px;
      padding: 0 4px;
      border-radius: 3px;
      height: 100%;
    }

    .create-card-wrapper button {
      color: ${props => props.theme.colors.border};
    }

    .c-flex {
      ${props => props.theme.mixins.flex("row", "end")};
      gap: 4px;

      svg {
        color: ${props => props.theme.colors.border};
      }

      & button:first-child {
        color: #fff;
      }
    }

    .list-cards {
      flex: 1 1 auto;
      margin: 0 4px;
      min-height: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 4px;
      z-index: 1;

      .card-drag-placeholder,
      .list-card {
        ${props => props.theme.styles.cardBoxShadow};
        background-color: #fff;
        border-radius: 3px;
        cursor: pointer;
        display: block;
        margin-bottom: 8px;
        max-width: 300px;
        min-height: 20px;
        position: relative;
        text-decoration: none;
        z-index: 0;
        min-height: 35px;

        &:hover {
          .edit-button {
            visibility: visible;
          }
        }
      }

      .card-drag-placeholder {
        background-color: #cccccc50;
        box-shadow: none;
      }

      .list-card-title {
        word-wrap: break-word;
        clear: both;
        color: #172b4d;
        display: block;
        margin: 0 0 4px;
        overflow: hidden;
        text-decoration: none;
      }

      .list-card-cover {
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-user-select: none;
        user-select: none;
      }

      .edit-button {
        position: absolute;
        top: 1px;
        right: 1px;
        visibility: hidden;
        border-radius: 3px;
      }

      .list-card-details {
        overflow: hidden;
        padding: 6px 8px 2px;
        position: relative;
        /* z-index: 10; */
      }

      .card-label {
        float: left;
        font-size: 12px;
        font-weight: 700;
        height: 8px;
        line-height: 100px;
        margin: 0 4px 4px 0;
        max-width: 40px;
        min-width: 40px;
        padding: 0;
        text-shadow: none;
        width: auto;
      }
    }
  }
`
