export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chargeUser = async (userId: string, amountUsd: number) => {
    await wait(1000)
    console.log(`... charging user ${userId} an amount of ${amountUsd} usd`)
    mayThrowError()
}

function mayThrowError() {
    if (Math.random() < 0.5) {
        throw new Error('unexpected err while charging')
    }
}
