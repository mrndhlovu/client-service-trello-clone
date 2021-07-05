const closeOnExit = server => {
  const handleClose = async () => {
    await server
      .close()
      .then(() => {
        console.log("Server closed successfully")
        process.exit()
      })
      .catch(() => {
        console.log("Fail to close server process")
      })
  }

  const events = "exit SIGINT uncaughtException SIGUSR1, SIGUSR2"

  events.split(" ").forEach(event => {
    process.on(event, handleClose)
  })
}

export { closeOnExit }
