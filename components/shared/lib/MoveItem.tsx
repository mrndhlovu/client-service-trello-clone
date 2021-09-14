import { Button } from "@chakra-ui/button"
import { Select } from "@chakra-ui/select"
import { useState } from "react"
import { IBoard } from "../../../lib/providers"
import { IListItem } from "../../board/canvas/ListItem"

interface IProps {
  sourceList: IListItem[] | IBoard[]
  destinationList?: IListItem[]
  sourcePosition: number
  destPosition: number

  handleMove: (
    sourceId: string,
    destinationId: string,
    position: number
  ) => void
}

const MoveItem = ({
  sourceList,
  destinationList,
  handleMove,
  sourcePosition,
  destPosition,
}: IProps) => {
  const [selectedSource, setSelectedSource] = useState<string>()
  const [selectedDest, setSelectedDest] = useState<string>()
  const [selectedPosition, setSelectedPosition] = useState<number>()

  const move = () => {
    handleMove(selectedDest, selectedSource, selectedPosition)
  }
  const handleSelectedPosition = () => {}
  const handleSelectedDest = () => {}
  const handleSelectedSource = () => {}

  return (
    <div>
      <h4>Select Destination</h4>
      <div className="content">
        <div className="source">
          <Select
            defaultValue={sourceList?.[sourcePosition]?.id}
            onChange={handleSelectedSource}
          >
            {sourceList?.map(item => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </div>

        <div className="destination">
          {destinationList && (
            <div className="dest-select">
              <Select
                defaultValue={destinationList?.[destPosition]?.id}
                onChange={handleSelectedDest}
              >
                {destinationList.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="position">
            <Select
              defaultValue={sourcePosition}
              onChange={handleSelectedPosition}
            >
              <option value="Position"></option>
            </Select>
          </div>
        </div>
        <Button onClick={move} colorScheme="blue" size="sm">
          Move
        </Button>
      </div>
    </div>
  )
}

export { MoveItem }
