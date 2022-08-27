import { emailQueue } from "./email-queue";

const newUsers = [
    {
        username: 'thanh',
        password: '123',
        email: 'thanh@gmail.com',
        isVerified: false
    },
    {
        username: 'david',
        password: '123',
        email: 'david@gmail.com',
        isVerified: false
    },
    {
        username: 'john',
        password: '123',
        email: 'john@gmail.com',
        isVerified: false
    }
]

const users = [];

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function registerUser(newUser: { username: string, password: string, email: string, isVerified: boolean }) {


    users.push(newUser);

    // sending verification email
    console.time(`sendVerificationEmail-${newUser.email}`)
    // await sendVerificationEmail(newUser.email);
    await emailQueue.add(newUser);
    console.timeEnd(`sendVerificationEmail-${newUser.email}`)

    console.log(`Responded to user ${newUser.username}`)
    return { success: true }
}

export async function sendVerificationEmail(email: string) {
    await wait(2000); // simulate calling mail service
    console.log('Verification mail has been sent to ' + email);
}

newUsers.forEach(user => {
    registerUser(user);
})
