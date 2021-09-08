import { ModalHeader } from "@chakra-ui/react"

import { AiOutlineClose } from "react-icons/ai"
import { useCardContext } from "../../../../lib/providers"

const CardHeader = () => {
  const { closeCardModal } = useCardContext()

  return (
    <>
      <ModalHeader>Modal Title</ModalHeader>
      <AiOutlineClose
        onClick={closeCardModal}
        className="card-close-btn"
        size={22}
      />
    </>
  )
}

export default CardHeader
