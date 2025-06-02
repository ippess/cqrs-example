export abstract class EventSourceable<Event> {
  private readonly publishQueue: Event[] = [];
  private version = 0;

  constructor(events: Event[] = []) {
    this.replay(events);
  }

  private replay(events: Event[]): void {
    for (const event of events) {
      this.apply(event);
      this.version++;
    }
  }

  protected emit(event: Event): void {
    this.apply(event);
    this.publishQueue.push(event);
  }

  protected abstract apply(event: Event): void;

  public pullEvents(): Event[] {
    const events = [...this.publishQueue];
    this.version += this.publishQueue.length;
    this.publishQueue.length = 0;
    return events;
  }

  public getVersion(): number {
    return this.version;
  }
}
