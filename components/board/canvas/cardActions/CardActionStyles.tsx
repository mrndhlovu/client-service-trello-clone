import styled from "styled-components"

export default styled.div`
  max-width: 300px;

  ul {
    list-style: none;
  }

  .divider {
    margin: 14px 0;
  }

  .image-upload {
    display: none;
  }

  .button-group {
    justify-content: space-between;
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  button {
    border-radius: 3px;
  }

  .label-color {
    border-radius: 3px;
    cursor: pointer;
    font-weight: 700;
    margin: 0 0 4px;
    min-height: 20px;
    padding: 10px 12px;
    position: relative;
    transition: padding 85ms, margin 85ms, box-shadow 85ms;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .confirm-label,
  .pick-label {
    position: relative;
    display: flex;
  }

  .pick-label {
    flex-direction: column;

    .label-color {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .saved-label-name {
        color: #fff;
      }
    }
  }

  .attachment-list {
    display: grid;
    gap: 8px;
    padding: 4px;
    margin: 0 -4px;
    overflow-x: hidden;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .confirm-label {
    .label-color {
      height: 32px;
      margin: 0 8px 8px 0;
      padding: 0;
      width: 48px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }

  .confirm-label {
    flex-wrap: wrap;
    place-content: center;
  }

  .item,
  .item-selected {
    display: flex;
    position: relative;
  }

  .item {
    padding-right: 36px;

    a {
      border-radius: 3px;
      padding: 6px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .item-selected {
    width: fit-content;
  }

  input,
  h4 {
    margin-bottom: 10px;
  }

  h4 {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`
