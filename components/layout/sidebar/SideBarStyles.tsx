import styled from "styled-components"

export default styled.div`
  .sb {
    position: sticky;
    top: 0;
    transform: translateY(+8px);

    .sb-primary {
      margin-bottom: 12px;
      ul {
        margin: 0;
        padding: 0;
        margin-bottom: 12px;
        color: #172b4d;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }
    }

    .sb-link-item {
      margin-bottom: 4px;
      list-style: none;

      a {
        ${props => props.theme.mixins.flex(undefined, "flex-start")};
        align-items: center;
        background-color: transparent;
        border-radius: 4px;
        box-shadow: none;
        font-weight: 600;
        margin: 0;
        min-height: 20px;
        overflow: hidden;
        padding: 6px 8px;
        text-decoration: none;
        transition-property: background-color, border-color, box-shadow;
        transition-duration: 85ms;
        transition-timing-function: ease;
        color: currentColor;
        font-size: 12px;
      }

      &:hover {
        background-color: #dbdee27a;
      }

      &-icon {
        display: block;
        flex: 0 0 auto;
        text-align: center;
        width: 32px;
      }
      &-text {
        width: min-content;
      }
    }

    .sb-link-item.active {
      a {
        background-color: #e4f0f6;
        color: #0079bf;

        &:hover {
          background-color: #e4f0f6;
        }
      }
    }

    .sb-secondary {
      margin: 0;
      padding: 0;
      margin-bottom: 12px;
      color: #172b4d;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;

      li {
        list-style: none;
      }

      .workspace-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 2px 6px 10px;

        button {
          background-color: transparent;
          background: transparent;

          &:hover {
            background: #eee;
          }
        }
      }

      .toggle {
        align-items: center;
        background-color: transparent;
        border-radius: 4px;
        box-shadow: none;
        display: flex;
        font-weight: bold;
        margin: 0;
        min-height: 20px;
        overflow: hidden;
        padding: 6px;
        text-decoration: none;
        transition-property: background-color, border-color, box-shadow;
        transition-duration: 85ms;
        transition-timing-function: ease;
        border: none;
        width: 100%;

        &:hover {
          background-color: #dbdee2;
        }
      }

      .accordion-item {
        border: none;
        padding: 0 5px;
      }

      .toggle-content {
        ${props => props.theme.mixins.flex(undefined, "space-between")};
        color: #172b4d;
        width: 100%;

        & > div:first-child {
          display: flex;
        }

        .toggle-button-icon {
          width: 15px;
          height: 15px;
          margin-right: 10px;

          span {
            color: #fff;
            font-size: 12px;
          }
        }

        strong {
          font-size: 13px;
        }

        .redirect-icon {
          display: none;
        }

        &:hover {
          .redirect-icon {
            display: block;
          }
        }
      }

      .sb-link-item {
        padding: 6px 8px 6px 0;
        text-decoration: none;
        align-items: center;
        background-color: transparent;
        border-radius: 4px;
        transition-property: background-color, border-color, box-shadow;
        transition-duration: 85ms;
        transition-timing-function: ease;
        color: ${props => props.theme.colors.border};

        &:hover {
          background-color: #dbdee27a;
        }
      }

      .button-text {
        display: flex;
        align-items: center;
        font-size: 12.5px;
        font-weight: 300;
      }
    }
  }
`
