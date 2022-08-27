const users = [];

export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ordinaryRegisterUser() {
    const newUser = {
        username: 'thanh',
        password: '123',
        email: 'thanh@gmail.com',
        isVerified: false
    }

    users.push(newUser);

    // sending verification email
    console.time('sendVerificationEmail')
    await sendVerificationEmail(newUser.email);
    console.timeEnd('sendVerificationEmail')

    return { success: true }
}

async function sendVerificationEmail(email: string) {
    await wait(2000); // simulate calling mail service
    console.log('Verification mail has been sent to ' + email);
}


ordinaryRegisterUser();