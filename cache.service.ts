import { Injectable } from '@angular/core';
// import { createClient } from 'redis';
interface CacheEntry {
  url: string;
  response: any;
  expiration: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheEntry>();
  private ttl = 2592000000; // Time to live in milliseconds (e.g., 30 Days)

  get(url: string): any | null {
    const entry = this.cache.get(url);
    if (!entry) return null;
    if (Date.now() > entry.expiration) {
      this.cache.delete(url);
      return null;
    }
    return entry.response;
  }

  set(url: string, response: any): void {
    const expiration = Date.now() + this.ttl;
    this.cache.set(url, { url, response, expiration });
  }
}
