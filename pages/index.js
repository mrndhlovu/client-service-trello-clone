import { HomeContext, useAuth } from "../helpers/hooks/context"
import HomePage from "../components/home/HomePage"

const LandingPage = ({ boards }) => {
  return (
    <HomeContext.Provider value={{ boards }}>
      <HomePage />
    </HomeContext.Provider>
  )
}

LandingPage.getInitialProps = async ({ req }) => {
  // const boards = await getBoards()
  //   .then(res => ({
  //     boards: res.data,
  //   }))
  //   .catch(err => {
  //     return {
  //       error: err.response,
  //     }
  //   })

  return { boards: {} }
}

export default LandingPage
