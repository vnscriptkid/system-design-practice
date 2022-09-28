import axios from 'axios';

async function main() {
    await Promise.all([
        wait(200).then(() => callIoTask(10)),
        callCpuTask(10)
    ])
}

async function callIoTask(numOfReqs: number) {
    console.log('@@ start IO')

    await Promise.all(
        Array(numOfReqs)
            .fill(null)
            .map(
                () => axios.get('http://localhost:3000/io-task')
                    .then(x => console.log('^^ [IO] done: ', x.data?.length))
            )
    )
}

async function callCpuTask(numOfReqs: number) {
    console.log('@@ start CPU')

    await Promise.all(
        Array(numOfReqs)
            .fill(null)
            .map(
                () => axios.get('http://localhost:3000/cpu-task?n=40')
                    .then(x => console.log('^^ [CPU] done: ', x.data))
            )
    )
}

async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main();