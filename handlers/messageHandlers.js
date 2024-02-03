"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserRegistration = exports.handlePasswordReset = void 0;
const nodeMailer_1 = __importDefault(require("../nodeMailer"));
const handlePasswordReset = ({ email, resetToken }) => {
    const url = process.env.RESET_URL + resetToken;
    return (0, nodeMailer_1.default)({
        email,
        subject: 'Password reset request.',
        text: `You are receiving this email because you (or someone else) has requested the reset of a password. You can do this at: \n\n ${url}`
    });
};
exports.handlePasswordReset = handlePasswordReset;
const handleUserRegistration = ({ email }) => {
    console.log(email);
    return (0, nodeMailer_1.default)({
        email,
        subject: 'Registration',
        text: 'You are receiving this email because you (or someone else) has signed you up for our website.'
    });
};
exports.handleUserRegistration = handleUserRegistration;
