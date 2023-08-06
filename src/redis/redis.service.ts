import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject('CACHE_MANAGER') private readonly cache: Cache) {}

  public static TOKEN = 'TOKEN:';

  async get(key: string) {
    const res = await this.cache.get(key);
    Logger.debug('RedisService-[get]. key:' + key + ', value:' + res);
    return res;
  }

  async set(key: string, value: unknown, ttl?: number) {
    Logger.debug(
      'RedisService-[set]. key:' + key + ', value:' + value + ', ttl:' + ttl,
    );
    await this.cache.set(key, value, ttl);
  }

  async remove(key: string) {
    Logger.debug('RedisService-[remove]. key:' + key);
    await this.cache.del(key);
  }

  async clear() {
    Logger.debug('RedisService-[clear]');
    await this.cache.reset();
  }
}
