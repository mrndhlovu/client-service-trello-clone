import { Progress } from "@chakra-ui/progress"

const ChecklistProgress = ({ completeState }: { completeState: number }) => {
  return (
    <div className="progress">
      {<small>{completeState}%</small>}
      <Progress
        max={100}
        colorScheme="whatsapp"
        size="sm"
        value={completeState}
        className="progress-range"
      />
    </div>
  )
}

export default ChecklistProgress
