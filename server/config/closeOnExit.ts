import chalk from "chalk"

const closeOnExit = server => {
  const handleClose = async () => {
    await server
      .close()
      .then(() => {
        chalk.green("Server closed successfully")
        process.exit()
      })
      .catch(() => {
        chalk.red("Fail to close server process")
      })
  }

  const events = "exit SIGINT uncaughtException SIGUSR1, SIGUSR2"

  events.split(" ").forEach(event => {
    process.on(event, handleClose)
  })
}

export { closeOnExit }
