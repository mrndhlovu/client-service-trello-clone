import styled from "styled-components"

export default styled.div`
  width: 220px;

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

    .template-list-item,
    .sb-link-item {
      margin-bottom: 4px;
      list-style: none;
      button,
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
        padding: 3px 8px;
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

      button {
        height: 100%;
        width: 100%;
        display: inline-block;
        text-align: left;
        font-weight: 200;
        margin-left: 30px;
      }
    }
    .template-list-item.active,
    .sb-link-item.active {
      background-color: #e4f0f6;
      color: #0079bf;

      &:hover {
        background-color: #e4f0f6;
      }
    }

    .template-list-item.active.sub-item {
      &:hover {
        opacity: 0.7;
      }
    }
  }
`
