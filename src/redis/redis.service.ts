import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  public static TOKEN = 'TOKEN:';

  async get(key: string) {
    const res = await this.cache.get(key);
    Logger.log('RedisService-[get]. key:' + key + ', value:' + res);
    return res;
  }

  async set(key: string, value: unknown, ttl?: number) {
    Logger.log(
      'RedisService-[set]. key:' + key + ', value:' + value + ', ttl:' + ttl,
    );
    await this.cache.set(key, value, ttl);
  }

  async remove(key: string) {
    Logger.log('RedisService-[remove]. key:' + key);
    await this.cache.del(key);
  }

  async clear() {
    Logger.log('RedisService-[clear]');
    await this.cache.reset();
  }
}
