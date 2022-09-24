import fs from 'fs/promises';
import path from 'path';
import users from './users.json';

interface IUser {
    "id": number
    "name": string,
    "balance": number,
    "address": {
        "street": string,
        "city": string,
        "state": string,
        "zipCode": string
    }
}

class UsersDb {
    users: IUser[];

    constructor(users: any) {
        this.users = users;
    }

    findById(uid: number) {
        return this.users.find(x => x.id === uid);
    }

    async updateBalance(user: IUser, amount: number) {
        const idx = this.users.findIndex(x => x.id === user.id);

        if (idx === -1) throw new Error('user not found');

        const isDeducting = amount < 0;

        if (isDeducting && user.balance + amount < 0) {
            throw new Error('Insufficient balance');
        }

        // update data in memory
        user.balance += amount;
        this.users[idx] = user;

        // update persistent data
        try {
            await this.writeToDb();
        } catch (err) {
            throw new Error('failed to write to disk');
        }

        console.info(`${isDeducting ? 'Deducted' : 'Restored'} user balance successfully`);
    }

    async writeToDb() {
        const file = path.join(__dirname, './users.json');

        await fs.writeFile(file, JSON.stringify(this.users));
    }
}

export const usersDb = new UsersDb(users);