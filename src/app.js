"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var amqp = require("amqplib/callback_api");
var product_1 = require("./entity/product");
typeorm_1.createConnection().then(function (db) {
    var productRepository = db.getMongoRepository(product_1.Product);
    amqp.connect('amqps://inwmlcbs:3e-VURKX4cVGWW5OGxMp_lHYio7du_-R@clam.rmq.cloudamqp.com/inwmlcbs', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            //listent even
            channel.assertQueue('hello', { durable: false });
            var app = express();
            app.use(cors({
                origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
            }));
            app.use(express.json());
            //consume the event
            channel.consume('hello', function (msg) {
                console.log(msg.content.toString());
            });
            console.log('Listening to port: 8001');
            app.listen(8001);
        });
    });
});
