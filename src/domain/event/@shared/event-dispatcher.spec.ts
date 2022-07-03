import { EventDispatcher } from './EventDispatcher';
import { SendEmailWhenProductIsCreatedHandler } from './product/handler/send-email-when-productIs-created-handler.handler';

describe('domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1,
    );
  });
});
