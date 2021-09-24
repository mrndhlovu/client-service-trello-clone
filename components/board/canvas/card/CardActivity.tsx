import { Button } from "@chakra-ui/button"
import { GrUnorderedList } from "react-icons/gr"

import { useLocalStorage } from "../../../../lib/hooks"
import Activities from "./Activities"
import CardModule from "./CardModule"

const CardActivity = () => {
  const [showActivities, setShowActivities] = useLocalStorage(
    "SHOW_ACTIVITIES",
    true
  )

  const toggleActivities = () => setShowActivities(prev => !prev)

  return (
    <div className="card-activity module">
      <CardModule
        title="Activity"
        className="activity"
        icon={<GrUnorderedList size={16} />}
        option={
          <Button onClick={toggleActivities} size="sm" colorScheme="gray">
            Show details
          </Button>
        }
      />
      <Activities showActivities={showActivities} />
    </div>
  )
}

export default CardActivity
