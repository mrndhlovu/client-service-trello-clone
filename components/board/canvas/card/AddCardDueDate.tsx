import { ChangeEvent, useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import { Select } from "@chakra-ui/select"
import { Checkbox } from "@chakra-ui/checkbox"
import { DUE_DATE_REMINDERS } from "../../../../util/constants"
import { Button, ButtonGroup } from "@chakra-ui/button"

import { clientRequest } from "../../../../api"
import { useCardContext } from "../../../../lib/providers"
import StyleDates, { EndDate, StartDate } from "./StyleDates"

const FUTURE_TIME = new Date(new Date().getTime() + 60 * 60 * 24 * 1000)

const ACTIVE_OPTIONS_INITIAL_STATE = { startDate: false, dueDate: true }

const AddCardDueDate = () => {
  const { listId, cardId, updateCardState } = useCardContext()

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(FUTURE_TIME)
  const [endTime, setEndTime] = useState<Date>(FUTURE_TIME)
  const [reminder, setReminder] = useState<number>(0)
  const [active, setActive] = useState<{
    startDate: boolean
    dueDate: boolean
  }>(ACTIVE_OPTIONS_INITIAL_STATE)

  const handleStartDate = (date: Date | null) => {
    setStartDate(date)
  }

  const handleEndDate = (date: Date | null) => {
    setEndDate(date)
  }

  const handleEndTime = (date: Date | null) => {
    setEndTime(date)
  }

  const handleReminderUpdate = (ev: ChangeEvent<HTMLSelectElement>) => {
    setReminder(+ev.target.value)
  }

  const toggleActiveOptions = (ev: ChangeEvent<HTMLInputElement>) => {
    setActive(prev => ({
      ...prev,
      [ev.currentTarget.id]: !prev[ev.currentTarget.id],
    }))
  }

  const handleUpdateCardDates = () => {
    if (!endTime) return
    const update = {
      start: startDate,
      due: endDate,
      dueReminder: reminder,
      dueComplete: false,
    }

    clientRequest
      .updateCard(update, { cardId, listId })
      .then(res => updateCardState(res.data))
      .catch(err => {})
  }

  const handleRemoveCardDates = () => {
    const update = {
      start: "",
      due: "",
      dueReminder: -1,
      dueComplete: false,
    }

    clientRequest
      .updateCard(update, { cardId, listId })
      .then(res => updateCardState(res.data))
      .catch(() => null)
  }

  return (
    <StyleDates>
      <DatePicker
        calendarClassName="calendar-styles"
        inline
        selected={startDate}
        onChange={handleStartDate}
      />

      <StartDate>
        <h6>Start date</h6>
        <span className="start-date">
          <Checkbox
            id="startDate"
            checked={active.startDate}
            onChange={toggleActiveOptions}
          />
          <DatePicker
            selected={startDate}
            onChange={handleStartDate}
            dateFormat="dd/MM/yyyy"
            showTimeSelectOnly
            disabled={!active.startDate}
          />
        </span>
      </StartDate>

      <EndDate>
        <h6>Due date</h6>
        <div className="end-date">
          <Checkbox
            id="dueDate"
            isChecked={active.dueDate}
            checked={active.dueDate}
            onChange={toggleActiveOptions}
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDate}
            dateFormat="dd/MM/yyyy"
            showTimeSelectOnly
            disabled={!active.dueDate}
            autoFocus
          />

          <DatePicker
            selected={endTime}
            onChange={handleEndTime}
            dateFormat="hh:mm aa"
            showTimeSelectOnly
            disabled={!active.dueDate}
            autoFocus
          />
        </div>
      </EndDate>

      <div>
        <h6 className="reminder">Set due date reminder</h6>
        <Select
          onChange={handleReminderUpdate}
          defaultValue={reminder}
          size="sm"
          placeholder="1 Day before"
        >
          {DUE_DATE_REMINDERS.map(option => (
            <option value={option.key} defaultValue={option.key}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <ButtonGroup className="button-group">
        <Button
          onClick={handleUpdateCardDates}
          colorScheme="blue"
          isFullWidth
          size="sm"
        >
          Save
        </Button>
        <Button onClick={handleRemoveCardDates} isFullWidth size="sm">
          Remove
        </Button>
      </ButtonGroup>
    </StyleDates>
  )
}

export default AddCardDueDate
