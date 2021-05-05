import * as express from 'express'
import {Request, Response} from 'express'
import * as cors from 'cors'
import {createConnection} from "typeorm";
import * as amqp from 'amqplib/callback_api';
import {Product} from "./entity/product";

createConnection().then(db => {
    const productRepository = db.getMongoRepository(Product)


    amqp.connect('amqps://inwmlcbs:3e-VURKX4cVGWW5OGxMp_lHYio7du_-R@clam.rmq.cloudamqp.com/inwmlcbs', (error0, connection) => {
        if (error0) {
            throw error0
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1
            }

            const app = express()

            app.use(cors({
                origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
            }))
            app.use(express.json())
        
            console.log('Listening to port: 8001')
            app.listen(8001)

        })
    })
});