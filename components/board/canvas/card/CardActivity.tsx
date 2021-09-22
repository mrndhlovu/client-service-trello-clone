import { useState } from "react"
import { Button } from "@chakra-ui/button"
import { GrUnorderedList } from "react-icons/gr"

import Activities from "./Activities"

import CardModule from "./CardModule"
import { useLocalStorage } from "../../../../lib/hooks"

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
      {showActivities && <Activities />}
    </div>
  )
}

export default CardActivity
