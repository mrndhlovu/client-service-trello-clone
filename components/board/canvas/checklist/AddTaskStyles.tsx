import styled from "styled-components"

export default styled.div`
  &,
  .content {
    display: grid;
    gap: 5px;
  }

  button {
    width: max-content;
  }

  .btn-group {
    align-items: center;
  }

  .progress {
    div:first-child {
      border-radius: 8px;
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
    padding-right: 10px;

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
    }

    .controls {
      visibility: hidden;
      ${props => props.theme.mixins.flex()};
      button {
        padding: 0px;
        background-color: inherit;

        &:hover {
          background-color: #091e4214;
        }
      }
    }

    &:hover {
      background-color: #091e4214;
      .controls {
        visibility: visible;
      }
    }
  }
`
