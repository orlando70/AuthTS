import config from './config'
import initialize from './initialize'
import http from 'http'
import stoppable from 'stoppable'
import { MigrationExecutor } from 'typeorm'
import { AppDataSource } from './config/data-source'

const runMigrations = async () => {
  const executor = new MigrationExecutor(AppDataSource, AppDataSource.createQueryRunner())
  await executor.executePendingMigrations()
}

const startServer = async () => {
  (global as any).isStartingUp = true

  const app = (await import('./app')).default
  const server = stoppable(http.createServer(app))

  server.listen(config.app.port, () => {
    console.log(`! Server Started and Listening on Port: ${config.app.port} with PID: ${process.pid}`)
  })

  process.on('SIGTERM', async () => {
    (global as any).isShuttingDown = true

    console.log('Starting graceful server shutdown')
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000))

    server.stop(() => {
      console.log('Graceful server shutdown completed')
      setTimeout(() => process.exit(0), 1000)
    })
  })
}

const start = async () => {
  try {
    await initialize()
    await runMigrations()
    await startServer()
  } catch (error) {
    console.log(error)
  }
}

export default start()
