import { GetServerSideProps } from "next"

import HomePage from "../components/home/HomePage"
import { getCardsList } from "../endpoints"
import { HomeContext } from "../helpers/hooks/context"

type CardsList = {
  name: string
  category: string
}

export interface HomeProps {
  cards: CardsList[] | []
}

export interface HomeContextValueTypes {
  cards: HomeProps["cards"]
}

const Index = ({ cards }) => (
  <HomeContext.Provider value={{ cards }}>
    <HomePage />
  </HomeContext.Provider>
)

export const getServerSideProps: GetServerSideProps<HomeProps> =
  async _context => {
    const cards = await getCardsList()
      .then(res => res.data)
      .catch(_err => [])

    return { props: { cards } }
  }

export default Index
