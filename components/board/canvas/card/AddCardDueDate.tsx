import { useState } from "react"
import DatePicker from "react-datepicker"
import styled from "styled-components"

import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import { Checkbox } from "@chakra-ui/checkbox"
import { DUE_DATE_REMINDERS } from "../../../../util/constants"
import { Button, ButtonGroup } from "@chakra-ui/button"

const Container = styled.div`
  .calendar-styles {
    width: 100%;
    border: none;

    .react-datepicker__current-month {
      color: rgb(23, 43, 77);
      text-transform: uppercase;
    }

    .react-datepicker__header {
      background-color: transparent;
      font-weight: bold;
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

    background-color: #ffffff;
    box-shadow: inset 0 0 0 2px #0079bf;
    height: 30px;
    width: 112px;
    padding: 0 8px;
    letter-spacing: 0.8px;
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

const StartDate = styled.div`
  display: grid;
  max-width: 100%;
  margin-top: 8px;

  .start-date {
    display: flex;
  }
`

const EndDate = styled.div`
  display: grid;
  max-width: 100%;
  margin-top: 8px;
  margin-bottom: 15px;
`

const FUTURE_TIME = new Date(new Date().getTime() + 60 * 60 * 24 * 1000)

const AddCardDueDate = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(FUTURE_TIME)
  const [endTime, setEndTime] = useState<Date>(FUTURE_TIME)

  const handleStartDate = (date: Date | null) => {
    setStartDate(date)
  }

  const handleEndDate = (date: Date | null) => {
    setEndDate(date)
  }

  const handleEndTime = (date: Date | null) => {
    setEndTime(date)
  }

  console.log("====================================")
  console.log({ endDate, endTime })
  console.log("====================================")

  return (
    <Container>
      <DatePicker
        calendarClassName="calendar-styles"
        inline
        selected={startDate}
        onChange={handleStartDate}
      />

      <StartDate>
        <h6>Start date</h6>
        <span className="start-date">
          <Checkbox />
          <DatePicker
            selected={startDate}
            onChange={handleStartDate}
            dateFormat="dd/MM/yyyy"
            showTimeSelectOnly
          />
        </span>
      </StartDate>

      <EndDate>
        <h6>Due date</h6>
        <div className="end-date">
          <Checkbox />
          <DatePicker
            selected={endDate}
            onChange={handleEndDate}
            dateFormat="dd/MM/yyyy"
            showTimeSelectOnly
          />

          <DatePicker
            selected={endTime}
            onChange={handleEndTime}
            dateFormat="hh:mm aa"
            showTimeSelectOnly
          />
        </div>
      </EndDate>

      <div>
        <h6 className="reminder">Set due date reminder</h6>
        <Select size="sm" placeholder="1 Day before">
          {DUE_DATE_REMINDERS.map(option => (
            <option defaultValue={option.key}>{option.label}</option>
          ))}
        </Select>
      </div>

      <ButtonGroup className="button-group">
        <Button colorScheme="blue" isFullWidth size="sm">
          Save
        </Button>
        <Button isFullWidth size="sm">
          Remove
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default AddCardDueDate
