import axios from "axios"

export const getCardsList = async () =>
  await axios.get("http://localhost:3000/api/cards")
