import sendMail from "../nodeMailer"

interface PasswordResetData {
    email: string;
    resetToken: string;
}

interface RegistrationData {
    email: string
}

export const handlePasswordReset = ({ email, resetToken }: PasswordResetData) => {
    const url = process.env.RESET_URL  + resetToken
    return sendMail({
        email,
        subject: 'Password reset request.',
        text: `You are receiving this email because you (or someone else) has requested the reset of a password. You can do this at: \n\n ${url}`
    })
}

export const handleUserRegistration = ({ email }: RegistrationData) => {
    return sendMail({
        email,
        subject: 'Registration',
        text: 'You are receiving this email because you (or someone else) has signed you up for our website.'
    })
}