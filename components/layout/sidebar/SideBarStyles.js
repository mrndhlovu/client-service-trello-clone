import styled from "styled-components"

export default styled.div`
  position: sticky;
  top: 0;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  height: 100%;

  .sb {
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
        font-weight: bold;
        margin: 0;
        min-height: 20px;
        overflow: hidden;
        padding: 6px 8px 6px 0;
        text-decoration: none;
        transition-property: background-color, border-color, box-shadow;
        transition-duration: 85ms;
        transition-timing-function: ease;
        color: ${props => props.theme.colors.bgDark};
        font-size: 13.5px;

        &:hover {
          background-color: ${props => props.theme.colors.lightBorder};
        }
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
      ul {
        margin: 0;
        padding: 0;
        margin-bottom: 12px;
        color: #172b4d;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
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
        padding: 6px 8px 6px 0;
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

      .toggle-content {
        color: #172b4d;
        width: 100%;

        .toggle-button-icon {
          width: 15px;
          height: 15px;
          background: linear-gradient(#b22865, #cd5a91);
          margin: 0 10px;
          padding: 10px;
          position: relative;
          border-radius: 3px;
          padding-top: 11px;

          span {
            color: #fff;
            ${props => props.theme.styles.absoluteCenter};
          }
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
        a {
          font-weight: lighter;
          font-size: 12.5px;
        }
      }

      .sb-link-item.active {
        a {
          background-color: #dbdee2;
          color: #0079bf;

          &:hover {
            background-color: #dbdee2;
          }
        }
      }
    }
  }
`
