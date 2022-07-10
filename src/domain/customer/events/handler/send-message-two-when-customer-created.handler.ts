import { EventHandlerInterface } from '../../../@shared/events/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.event';

export class SendMessagetwoWhenCustomerCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
