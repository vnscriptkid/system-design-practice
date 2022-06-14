import { RedisClientType } from "@redis/client";

export class Lock {
  client: RedisClientType<any, any, any>;
  consumerId = String(process.pid);

  constructor(client: RedisClientType<any, any, any>) {
    this.client = client;
  }

  async acquire(key: string) {
    while (true) {
      const result = await this.client.set(key, this.consumerId, {
        NX: true,
        EX: 300,
      });

      console.log(`@@ acquire result`, result, this.consumerId);

      if (result === "OK") return;
      else continue;
    }
  }

  async release(key: string) {
    const value = await this.client.get(key);

    if (value === this.consumerId) {
      const result = await this.client.del(key);

      console.log(`@@ release result`, result);

      return result === 1;
    }
    return false;
  }
}
