import { Transform, Type } from 'class-transformer';
import { PriceOption } from './PriceOption';

export class Session {
  id: number;
  productCode: string;

  @Transform((date) => new Date(date.value))
  startTime: Date;

  @Transform((date) => new Date(date.value))
  endTime: Date;

  @Transform((date) => new Date(date.value))
  startTimeLocal: Date;

  @Transform((date) => new Date(date.value))
  endTimeLocal: Date;
  
  allDay: boolean;
  seats: number;
  seatsAvailable: number;

  @Type(() => PriceOption)
  priceOptions: PriceOption[];

  constructor() {
    this.id = 0;
    this.productCode = '';

    this.startTime = new Date();
    this.endTime = new Date();
    this.startTimeLocal = new Date();
    this.endTimeLocal = new Date();

    this.allDay = false;
    this.seats = 0;
    this.seatsAvailable = 0;
    this.priceOptions = [];
  }
}
