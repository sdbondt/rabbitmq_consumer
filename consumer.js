"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const messageHandlers_1 = require("./handlers/messageHandlers");
const url = process.env.QUEUE_URL;
const consumeMessages = (queue, handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(url);
        const channel = yield connection.createChannel();
        yield channel.assertQueue(queue, { durable: false });
        channel.consume(queue, (message) => {
            if (message !== null) {
                const content = message.content.toString();
                const payload = JSON.parse(content);
                console.log(payload);
                handler(payload);
                channel.ack(message);
            }
        });
    }
    catch (e) {
        throw e;
    }
});
const startConsumer = () => {
    consumeMessages('passwordReset', messageHandlers_1.handlePasswordReset);
    consumeMessages('userRegistration', messageHandlers_1.handleUserRegistration);
};
exports.default = startConsumer;
