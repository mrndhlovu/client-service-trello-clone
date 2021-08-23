import styled from "styled-components"

export default styled.div`
  height: 100%;
  width: 100%;

  .content {
    ${props => props.theme.mixins.flex("row", "flex-start", "baseline")};
    height: 100%;
    width: 100%;
    padding: 0 5px;
    overflow-x: scroll;

    .list-wrapper {
      margin-left: 8px;
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      margin: 0 4px;
      vertical-align: top;
      white-space: nowrap;
      width: 272px;
    }

    .editable-header {
      ${props => props.theme.mixins.flex("row", "space-between")};
      flex: 1 1 auto;
      margin: 0 4px;
      min-height: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 2px 4px 0;
      z-index: 1;

      button:last-child {
        &:hover {
          background-color: #0000000d;
        }
      }
    }

    .list-item {
      background-color: #ebecf0;
      border-radius: 3px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      max-height: 100%;
      position: relative;
      white-space: normal;
      width: inherit;

      button {
        border: none;
      }
    }

    .create-card,
    .create-list {
      box-sizing: border-box;
      display: inline-block;
      margin: 0 4px 0 8px;
      vertical-align: top;
      white-space: nowrap;
      max-width: 272px;
      min-width: 272px;

      input {
        height: 32px;
      }
      button {
        border-radius: 3px;
        font-weight: lighter;
        justify-content: end;
      }
    }

    .create-card {
      min-width: 256px;
      max-width: 256px;

      textarea {
        background-color: #fff;
        ${props => props.theme.styles.cardBoxShadow};
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
      ${props => props.theme.mixins.flex("column", "flex-start", "end")};
      gap: 3px;
      padding: 4px;
      border-radius: 3px;
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
        z-index: 10;
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
