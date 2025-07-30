


export function generateForgotPasswordEmailTemplate(url, resetToken) {
    return `Copy the Reset Token : ${resetToken}`
}

export function applicationViewed(url, data) {
    return `hello,@ ${data.email}! Your Application for ${data.jobTitle} was viewed from Jobs4orDevs just now!`
}