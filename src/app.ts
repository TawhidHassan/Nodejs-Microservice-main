import * as express from 'express'
import {Request, Response} from 'express'
import * as cors from 'cors'
import {createConnection} from "typeorm";

import {Product} from "./entity/product";

createConnection().then(db => {
    const productRepository = db.getMongoRepository(Product)

    const app = express()

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))
    app.use(express.json())

    console.log('Listening to port: 8001')
    app.listen(8001)
});