// queue.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

interface Job<T = any> {
  data: T;
  handler: (data: T) => Promise<void> | void;
}

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private readonly queue: Job[] = [];
  private isProcessing = false;
  private interval: NodeJS.Timeout;

  onModuleInit() {
    // Start job processing loop
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.interval = setInterval(() => this.processQueue(), 100); // every 100ms
  }

  onModuleDestroy() {
    clearInterval(this.interval);
  }

  addJob<T>(data: T, handler: (data: T) => Promise<void> | void) {
    this.queue.push({ data, handler });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    const job = this.queue.shift();
    if (job) {
      try {
        await job.handler(job.data);
      } catch (error) {
        console.error('Job failed:', error);
      }
    }

    this.isProcessing = false;
  }
}
