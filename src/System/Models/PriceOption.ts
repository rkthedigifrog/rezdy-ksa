import { Expose } from 'class-transformer';

export class PriceOption {
  price: number;

  @Expose()
  label: string;

  @Expose()
  id: number;
  
  seatsUsed: number;
  priceGroupType: string;
  productCode: string;

  constructor() {
    this.price = 0;
    this.label = '';
    this.id = 0;
    this.seatsUsed = 0;
    this.priceGroupType = '';
    this.productCode = '';
  }
}
