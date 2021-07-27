import React from "react"
import { useHomeContext } from "../../lib/hooks/context"

const CardsList = () => {
  const { cards } = useHomeContext()
  return (
    <div>
      <h1>CardsList</h1>
      {cards?.map((card, index) => (
        <p key={index}>{card.name}</p>
      ))}
    </div>
  )
}

export default CardsList
