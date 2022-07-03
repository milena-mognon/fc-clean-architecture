import { EventInterface } from '../event.interface';

export class ProductCreatedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventDate: any;

  constructor(eventData: any) {
    this.dataTimeOcurred = new Date();
    this.eventDate = eventData;
  }
}
