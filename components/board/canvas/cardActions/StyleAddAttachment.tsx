import styled from "styled-components"

export default styled.div`
  max-width: 300px;

  .menu-option {
    width: 100%;
    padding: 5px 0;
    margin-top: 0 !important;
    font-size: 14px;
  }

  .attach-options {
    margin-bottom: 10px;

    .hidden-input {
      display: none;
    }
  }

  .attach-input {
    display: grid;
    grid-gap: 5px;

    label {
      color: #5e6c84;
      display: block;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      margin-bottom: 4px;
      margin-top: 12px;
    }

    button {
      width: max-content !important;
    }
  }
`
