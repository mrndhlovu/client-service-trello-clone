import axios from "axios"

export const getBoards = async () =>
  await axios.get("http://localhost:3000/api/board/all")
