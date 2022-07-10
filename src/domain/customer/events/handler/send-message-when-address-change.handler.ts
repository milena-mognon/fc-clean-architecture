import { EventHandlerInterface } from '../../../@shared/events/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.event';

export class SendMessageWhenAddressChangeHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventDate._id}, ${event.eventDate._name} 
       alterado para: ${event.eventDate.address._street},
       ${event.eventDate.address._number}, 
       ${event.eventDate.address._zip}, 
       ${event.eventDate.address._city},`,
    );
  }
}
