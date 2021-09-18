import styled from "styled-components"

export default styled.div`
  max-width: 300px;
  display: grid;
  h4 {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 16px;
    margin-top: 16px;
    text-transform: uppercase;
  }

  .content-dialog {
    margin-top: 8px;
  }

  select {
    background-color: #091e420a;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 48px;
    overflow: hidden;
    padding: 6px 12px;
    position: relative;
    text-decoration: none;
    text-overflow: ellipsis;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    -webkit-user-select: none;
    user-select: none;
    white-space: nowrap;
  }

  select,
  label {
    color: #5e6c84;
    display: block;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 0;
  }

  .setting-container {
    margin: 0 0 10px;

    svg {
      display: none;
    }
  }

  .setting-grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    gap: 5px;

    .setting-container:first-child {
      float: left;
      margin-top: 0;
      position: relative;
      flex: 2;
    }

    .setting-container:last-child {
      flex: 1;
    }
  }

  .move-btn {
    width: max-content !important;
  }
`
