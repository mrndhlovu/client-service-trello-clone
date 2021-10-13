import { ChangeEvent, FormEvent, useState } from "react"

import { Button, ButtonGroup } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Textarea } from "@chakra-ui/textarea"
import { Select } from "@chakra-ui/select"

import { useGlobalState, Workspace } from "../../lib/providers"
import { WORKSPACE_TYPES } from "../../util/constants"
import { clientRequest } from "../../api"

export interface IUpdateWorkspace {
  name?: string
  category?: string
  description?: string
  shortname?: string
  visibility?: "private" | "public"
}

const WorkspaceEditOptions = ({ workspace }: { workspace: Workspace }) => {
  const INITIAL_STATE = {
    name: workspace.name,
    category: workspace.category,
    description: workspace.description || "",
    shortname: workspace.shortname || "",
  }

  const { setWorkspaces, boards } = useGlobalState()

  const [editedWorkspace, setEditedWorkspace] =
    useState<IUpdateWorkspace>(INITIAL_STATE)

  const isDefaultCategory = workspace?.category === "default"

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setEditedWorkspace(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  const handleSave = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!editedWorkspace.name || !editedWorkspace.category) return
    clientRequest
      .updateWorkspace(editedWorkspace, workspace.id)
      .then(res => {
        setWorkspaces(prev => [
          ...prev.map(item => (item.id === workspace?.id ? res.data : item)),
        ])
        setEditedWorkspace(INITIAL_STATE)
      })
      .catch(err => {})
  }

  return (
    <div className="edit-workspace">
      <form onSubmit={handleSave}>
        <label htmlFor="name">
          Name
          <Input
            onChange={handleChange}
            size="sm"
            name="name"
            defaultValue={workspace?.name}
          />
        </label>

        <label htmlFor="category">
          Workspace type
          <Select
            defaultValue={workspace.category}
            onChange={handleChange}
            size="sm"
            name="category"
            disabled={isDefaultCategory}
          >
            <option>Choose...</option>

            {WORKSPACE_TYPES.map(type => (
              <option value={type.key} key={type.key}>
                {type.name}
              </option>
            ))}
          </Select>
        </label>

        <label htmlFor="shortname">
          Short name
          <Input
            name="shortname"
            size="sm"
            defaultValue={workspace?.shortname}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description (optional)
          <Textarea
            onChange={handleChange}
            name="description"
            defaultValue={workspace?.description}
          />
        </label>
        <ButtonGroup className="btn-group">
          <Button type="submit" size="sm">
            Save
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}

export { WorkspaceEditOptions }
