import amqp from "amqplib"
import { handlePasswordReset, handleUserRegistration } from "./handlers/messageHandlers"

const url = process.env.QUEUE_URL as string

const consumeMessages = async (queue: string, handler: (data: any) => void) => {
  try {
    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, { durable: false })
    channel.consume(queue, (message) => {
      if (message !== null) {
        const content = message.content.toString()
        const payload = JSON.parse(content)
        handler(payload)
        channel.ack(message)
      }
    })
  } catch (e) {
    throw e
  }
}


const startConsumer = () => {
    consumeMessages('passwordReset', handlePasswordReset)
    consumeMessages('userRegistration', handleUserRegistration)
}

export default startConsumer
