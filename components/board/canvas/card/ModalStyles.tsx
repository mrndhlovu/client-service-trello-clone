import { ModalContent, Modal } from "@chakra-ui/react"
import styled from "styled-components"

export default styled(ModalContent)`
  border-radius: 3px;
  max-width: 720px;
  z-index: 40;
  background-color: #f4f5f7;

  .card-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    padding: 10px;
    transition: ${props => props.theme.variables.transition};

    &:hover {
      background: #ccc;
    }
  }

  .link-btn {
    text-decoration: underline;
    margin: 0 5px;
  }

  header {
    padding-bottom: 0;
    position: relative;

    .header-cover-btn {
      position: absolute;
      right: 4px;
      top: -39px;
    }

    .card-header-content {
      width: 85%;
      margin-left: 34px;
      position: relative;

      button:not(.move-btn) {
        background-color: transparent;
        justify-content: start;
        font-size: 18px;
        font-weight: 700;
        padding: 0;
      }
      svg {
        position: absolute;
        left: -40px;
        top: 6px;
      }
    }

    p {
      font-size: 15px;
      font-weight: 400;
      color: #a4acc4;

      .list-title {
        font-size: 14px !important;
        text-decoration: underline;
        font-weight: 400;
      }
    }
  }

  .original-text {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .editable-text {
    width: 100%;
    display: grid;
    gap: 5px;
    margin: 10px 0;

    textarea {
      background-color: #fff;
    }
  }

  .card-modal-detail {
    min-height: 600px;
    display: grid;
    grid-template-columns: 3.5fr 1fr;
    padding: 10px 0 0;

    button {
      font-weight: 500;
    }

    .module {
      padding: 8px 12px;
    }

    .card-content-column {
      float: left;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0 8px 8px 16px;
      position: relative;
      z-index: 0;
      height: max-content;

      .user-avatar {
        position: absolute;
        left: -38px;
        top: 12px;

        .avatar-button-text {
          font-size: 13px;
        }
      }

      .card-labels-module {
        margin-top: 0;

        .module-header {
          margin-left: 38px !important;
          padding: 0 !important;
        }

        .card-label-list {
          display: flex;
          margin-left: 40px !important;
        }

        button {
          height: 32px;
          min-width: 40px;
        }

        h3 {
          font-size: 12px !important;
          font-weight: 300 !important;
          text-transform: uppercase;
        }
      }

      .module-content {
        margin-left: 32px;
        font-size: 14px;
      }

      .module-content.description {
        background-color: transparent;
        padding: 8px 8px 0px 0px;
        margin-left: 24px;
      }

      .module-header.checklist-header {
        justify-content: space-between;

        .edit-title-button {
          width: 100%;
          background-color: transparent;
          cursor: pointer;
          padding: 0;
          font-size: inherit;
        }
      }

      .card-description {
        resize: none;
        margin-bottom: 4px;
        outline: none;

        p {
          background-color: #091e420a;
          border: none;
          border-radius: 3px;
          box-shadow: none;
          display: block;
          min-height: 40px;
          padding: 8px 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .save-btn {
          clear: both;
          display: flex;
          flex-direction: row;
          margin-top: 8px;
          align-items: center;
          gap: 10px;

          svg {
            cursor: pointer;
          }
        }
      }

      .card-module {
        clear: both;
        position: relative;

        .module-header {
          align-items: center;
          display: flex;
          min-height: 32px;
          margin: 0 0 4px 24px;
          padding: 8px 0;
          position: relative;

          h3 {
            font-size: 16px;
            line-height: 20px;
            font-weight: 700;
            display: inline-block;
            margin: 0;
            min-height: 18px;
            min-width: 40px;
            width: auto;
          }

          .module-icon {
            color: #42526e;
            left: -32px;
            position: absolute;
            top: 10px;

            svg {
              font-size: 18px;
            }
          }
        }

        .module-header.activity {
          justify-content: space-between;
        }
        .module-header.description {
          gap: 10px;
        }
      }

      .mod-comment {
        padding: 8px 0;
        position: relative;
        transition-duration: 85ms;
        transition-property: padding-bottom;
        transition-timing-function: ease;
        margin: 0 0 8px 27px;

        .user-avatar {
          top: 17px;
        }
      }

      .mod-comment-frame {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
        margin: 4px 0 2px;
        overflow: visible;
        position: relative;
        transition: box-shadow 85ms ease;
      }

      .new-comment {
        min-height: 33px;
        max-height: 33px;
        border: 0;
        box-shadow: none;
        resize: none;
        width: 100%;
        font-size: 13px;
        padding: 8px 7px;
        transition: min-height 0.2s linear;
      }

      .controls {
        padding: 10px;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        display: none;

        .control-btn {
          display: flex;
          gap: 10px;
          padding: 5px 0;
          width: 100%;
          justify-content: flex-end;
        }
      }

      .edit-controls {
        font-size: 11px;
        a {
          margin: 0 5px;
        }
      }

      .controls.active {
        display: grid;
      }

      .comment-form {
        min-height: 30px;
      }

      .comment-form.active > .new-comment {
        min-height: 60px;
      }
    }

    .task-list {
      margin: 10px 0;
    }

    .card-sidebar {
      padding: 0 16px 8px 8px;

      h3 {
        text-transform: uppercase;
      }

      .sidebar-module {
        clear: both;
        margin-bottom: 24px;
        position: relative;
      }

      .buttons-list {
        button {
          width: 100%;
          justify-content: end;
          margin-top: 5px;
        }
      }
    }
  }
`

export const StyledModal = styled(Modal)`
  .chakra-modal__content-container {
    z-index: 1;
  }
`
