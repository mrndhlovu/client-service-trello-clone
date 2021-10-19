import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Select } from "@chakra-ui/select"
import { ChangeEvent, FormEvent } from "react"
import styled from "styled-components"

import { ITemplate, useGlobalState } from "../../../lib/providers"

const Form = styled.form`
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    margin-bottom: 4px;
    margin-top: 24px;
    color: #091e42;
  }

  button {
    margin: 15px 0 15px;
  }
`

const SelectWorkspace = ({
  handleCreate,
  handleChange,
  selectedTemplate,
  isLoading,
  disabled,
}: {
  handleChange: (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void
  handleCreate: () => void
  isLoading: boolean
  selectedTemplate: ITemplate
  disabled: boolean
}) => {
  const { workspaces } = useGlobalState()

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    handleCreate()
  }

  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="name">
        Board title
        <Input
          onChange={handleChange}
          size="sm"
          name="title"
          defaultValue={selectedTemplate.name}
        />
      </label>
      <label>
        Workspace
        <Select
          defaultValue="default"
          onChange={handleChange}
          size="sm"
          name="workspace"
        >
          <option value="default" disabled>
            Choose...
          </option>

          {workspaces?.map(workspace => (
            <option value={workspace.id} key={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </Select>
      </label>

      <Button
        isLoading={isLoading}
        isFullWidth
        colorScheme="blue"
        type="submit"
        size="sm"
        disabled={disabled}
      >
        Create
      </Button>
    </Form>
  )
}

export default SelectWorkspace
