"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
const sendMail = ({ email, text, subject }) => transporter.sendMail({
    to: email,
    subject,
    text,
    from: process.env.EMAIL,
});
exports.default = sendMail;
