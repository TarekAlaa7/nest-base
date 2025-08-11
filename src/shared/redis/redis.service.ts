import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'; 

@Injectable()
export class RedisService {
  private redisClient: Redis;  // Define the type of redisClient

  constructor() {
    // Initialize the Redis client
    this.redisClient = new Redis({
      host: 'localhost',  // Redis host (localhost by default)
      port: 6379,         // Redis default port
      password: '',       // Redis password (if any)
      db: 0               // Redis database number (default is 0)
    });
  }

  // Method to get a value from Redis by key
  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // Method to set a value in Redis by key
  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  // Method to delete a key from Redis
  async deleteKey(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
