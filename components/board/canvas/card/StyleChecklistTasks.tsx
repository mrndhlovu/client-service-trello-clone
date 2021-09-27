import styled from "styled-components"

export default styled.div`
  &,
  .content {
    display: grid;
  }

  button {
    width: max-content;
  }

  .btn-group {
    align-items: center;
  }

  .progress {
    justify-content: flex-start;
    align-items: center;
    position: relative;

    div:first-child {
      border-radius: 8px;
    }

    small {
      position: absolute;
      left: -7px;
      top: -3px;
    }

    &-range {
      margin-left: 28px;
    }
  }

  .draggable-task {
    border-radius: 3px;
    clear: both;
    position: relative;
    transform-origin: left bottom;
    transition-duration: 0.14s;
    transition-property: transform, opacity, height, padding, margin;
    transition-timing-function: ease-in;
    display: flex;
    align-items: center;
    cursor: pointer;
    left: -12px;

    .checkbox {
      margin: 6px;
      ${props => props.theme.mixins.flex()};

      input {
        background-color: #d1d1d1;
      }
    }

    .task-text {
      flex-grow: 3;
      padding: 0 10px;
      ${props => props.theme.mixins.flex("row", "start")};

      .edit-title-button {
        width: 100%;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
        justify-content: flex-start;
      }
    }

    .task-controls {
      visibility: hidden;
      ${props => props.theme.mixins.flex()};
      button {
        padding: 0px;
        background-color: inherit;

        &:hover {
          background-color: #091e4214;
        }
      }

      .menu-option {
        width: 100%;
        padding: 5px;
      }
    }

    &:hover {
      background-color: #091e4214;
      .task-controls {
        visibility: visible;
      }
    }
  }

  .add-item {
    button {
      margin-top: 10px;
    }
  }
`
