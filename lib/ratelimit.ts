import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RPM = 5; // 5 requests per minute

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(RPM, "1 m"),
  analytics: true,
});
