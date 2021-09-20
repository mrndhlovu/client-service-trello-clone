import { Input, Button } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"

import { clientRequest } from "../../../../api"
import { useCardContext } from "../../../../lib/providers"
import AddChecklistStyles from "./AddChecklistStyles"

export interface ITaskItem extends Document {
  state: "todo" | "complete"
  checklist: string
  item: string
  assignees: string[]
  id: string
}

export interface IChecklist {
  cardId: string
  tasks: ITaskItem[]
  owner: string
  title: string
  id: string
}

const AddChecklist = () => {
  const { cardId, card, updateCardState } = useCardContext()

  const [title, setTitle] = useState<string>("Checklist")

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value)
  }

  const handleAddChecklist = () => {
    if (!title) return
    clientRequest
      .createChecklist({ title, cardId })
      .then(res => {
        updateCardState({
          ...card,
          checklists: [...card.checklists, res.data],
        })
      })
      .catch(() => {})
      .finally(() => setTitle(""))
  }

  return (
    <AddChecklistStyles>
      <div className="input-wrapper">
        <label htmlFor="checklist">Title</label>
        <Input
          size="sm"
          onChange={handleChange}
          placeholder="Checklist"
          value={title}
        />
      </div>

      <Button size="sm" onClick={handleAddChecklist} colorScheme="blue">
        Add
      </Button>
    </AddChecklistStyles>
  )
}

export default AddChecklist
