import styled from "styled-components"

export default styled.div`
  .calendar-styles {
    width: 100%;
    border: none;

    .react-datepicker__current-month {
      color: rgb(23, 43, 77);
      text-transform: uppercase;
      padding: 0 0 10px;
      font-size: 13px;
    }

    .react-datepicker__header {
      background-color: transparent;
      font-weight: bold;
      font-size: 15px;
      padding: 0;
    }

    .react-datepicker__day-name {
      text-transform: uppercase;
      font-size: 12px;
      width: 2rem;
    }

    .react-datepicker__day {
      max-width: 32px;
      width: 100%;

      &:hover {
        background-color: rgb(66, 82, 110);
        color: #fff;
        ${props => props.theme.mixins.textHoverEffect()};
      }
    }

    .react-datepicker__navigation-icon {
      width: 3%;
      color: rgb(107, 119, 140);
    }

    .react-datepicker__month {
      margin: 5px 0;
    }

    .react-datepicker__month,
    .react-datepicker__month-container,
    .react-datepicker__month {
      width: 100% !important;
    }
  }

  h6 {
    display: block;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    margin-bottom: 4px;
    color: #0079bf;
  }

  input {
    outline: none;
    border: none;
    box-sizing: border-box;
    color: #172b4d;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    border-radius: 3px;
    margin-left: 8px;
    box-shadow: inset 0 0 0 2px #dfe1e2;

    background-color: #ffffff;
    height: 30px;
    width: 112px;
    padding: 0 8px;
    letter-spacing: 0.8px;

    &:focus {
      box-shadow: inset 0 0 0 2px #0079bf;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
      background-color: #eee;
    }
  }

  .end-date,
  .start-date {
    display: flex;
  }

  .button-group {
    display: grid;
    grid-gap: 10px;
    position: relative;
    margin-top: 10px;

    button {
      width: 100%;
      margin: 0;
    }
  }
`

export const StartDate = styled.div`
  display: grid;
  max-width: 100%;
  margin-top: 8px;

  .start-date {
    display: flex;
  }
`

export const EndDate = styled.div`
  display: grid;
  max-width: 100%;
  margin-top: 8px;
  margin-bottom: 15px;
`
