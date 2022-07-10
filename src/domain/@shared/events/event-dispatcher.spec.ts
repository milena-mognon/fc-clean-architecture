import { SendEmailWhenProductIsCreatedHandler } from '../../product/events/handler/send-email-when-productIs-created-handler.handler';
import { ProductCreatedEvent } from '../../product/events/product-created.event';
import { EventDispatcher } from './EventDispatcher';

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
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0,
    );
  });
  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBe(
      undefined,
    );
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    /**
     * spyEventHandler fica "espiando" se o método handle é executado
     */
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: 1,
      name: 'Product 1 description',
      price: 10.0,
    });

    /**
     * Quando o notify for executado, o sendEmailWhenProductCreatedHandler.handler() deve ser chamado
     */
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
