import { css } from "styled-components"

const reset = css`
  html {
    color: ${props => props.theme.colors.border};
  }

  .layout {
    height: 100vh;
    width: 100vw;
    background-color: ${props => props.theme.colors.bgLight};

    &-children {
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative;
    }
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  button {
    border-radius: 3px !important;
  }

  textarea {
    resize: vertical;
  }

  *:focus {
    box-shadow: none !important;
  }

  .next-link-btn {
    background-color: #091e420a;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    display: inline-block;
    margin-bottom: 8px;
    margin-left: 8px;
    padding: 6px 12px 6px 6px;
    position: relative;
    text-decoration: none;
  }

  .chakra-modal__overlay,
  .chakra-modal__content-container {
    z-index: 1;
  }

  .chakra-modal__content {
    margin-top: 38px;
    border-radius: 1.5px !important;
  }

  .card-modal-content {
    max-width: 720px !important;
  }

  .transparent-bg,
  .create-modal-content {
    background-color: transparent !important;
  }

  .control-edit {
    display: grid;
    grid-gap: 5px;

    button {
      width: max-content;
      margin-top: 10px;
    }
  }

  .transparent-bg {
    .preview-frame {
      padding: 48px 24px 112px;
      height: auto;
      text-align: center;
      margin: 0 auto;
      background-color: transparent;
    }

    .preview-detail {
      margin: 0 auto;
      position: absolute;
      z-index: 2;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      a {
        color: #fff;
        margin: 0 10px;
        text-decoration: underline;
      }
    }
  }
  .overlay-dark,
  .new-board-overlay {
    background-color: #0c0e16b3;
  }

  .new-board-modal-footer {
    justify-content: start;
    border-top: none;
    padding-top: 0;

    button {
      border: none;
      font-weight: 500;
    }
  }

  .chakra-portal .card-actions-close-btn {
    position: absolute;
    top: 38px;
    right: 38px;
    color: #fff;
    cursor: pointer;
  }

  .browserupgrade {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;
  }

  .hidden {
    display: none !important;
  }

  .card-editor {
    z-index: 20;
  }

  .card-editor-modal {
    background-color: transparent;
  }

  .card-editor-modal-content {
    background-color: transparent;
    z-index: 0;

    .close-button {
      border-color: none;
    }

    svg {
      color: #fff;
    }
  }

  .card-editor-overlay {
    z-index: 0;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: #00000070;
  }

  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  .visuallyhidden.focusable:active,
  .visuallyhidden.focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    white-space: inherit;
  }

  .invisible {
    visibility: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    content: " ";
    display: table;
  }

  .clearfix:after {
    clear: both;
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
      padding: 0 8px 0 0;
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

  @media only screen and (min-width: 35em) {
  }

  @media print,
    (-webkit-min-device-pixel-ratio: 1.25),
    (min-resolution: 1.25dppx),
    (min-resolution: 120dpi) {
  }

  @media print {
    *,
    *:before,
    *:after {
      background: transparent !important;
      color: #000 !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    abbr[title]:after {
      content: " (" attr(title) ")";
    }

    a[href^="#"]:after,
    a[href^="javascript:"]:after {
      content: "";
    }

    pre {
      white-space: pre-wrap !important;
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }
`

export default reset
