const { Kafka } = require('kafkajs')
const Chance = require('chance')

const chance = new Chance()
const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['kafka1:9092']
})

const topic = 'Operational'
const producer = kafka.producer()

const produceMessage = async () => {
    const value = chance.animal()
    try {
        await producer.send({
            topic,
            messages: [
                { value },
            ],
        })
    } catch (error) {
        console.log(error)
    }
}

const run = async () => {
    await producer.connect()
    setTimeout(() => {
        produceMessage()
    }, 5000)
}

run().catch(console.error)