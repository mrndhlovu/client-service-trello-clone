import { GetServerSideProps } from "next"

import { getBoards } from "../endpoints"
import { HomeContext } from "../helpers/hooks/context"
import HomePage from "../components/home/HomePage"

type BoardItem = {
  name: string
  category: string
}

export interface HomeProps {
  boards: BoardItem[] | []
}

export interface HomeContextValueTypes {
  boards: HomeProps["boards"]
}

const Index = ({ boards }) => (
  <HomeContext.Provider value={{ boards }}>
    <HomePage />
  </HomeContext.Provider>
)

export const getServerSideProps: GetServerSideProps<HomeProps> =
  async _context => {
    const boards = await getBoards()
      .then(res => res.data)
      .catch(_err => [])

    return { props: { boards } }
  }

export default Index
