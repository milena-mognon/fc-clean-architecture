import { EventInterface } from './event.interface';

/**
 * método handle recebe um evento que implemente o EventInterface
 */
export interface EventHandlerInterface<
  T extends EventInterface = EventInterface,
> {
  handle(event: T): void;
}
