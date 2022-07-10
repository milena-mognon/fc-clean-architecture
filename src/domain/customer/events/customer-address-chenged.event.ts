import { EventInterface } from '../../@shared/events/event.interface';

/**
 * Todos os eventos devem implementar EventInterface
 */
export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventDate: any;

  constructor(eventData: any) {
    this.dataTimeOcurred = new Date();
    this.eventDate = eventData;
  }
}
