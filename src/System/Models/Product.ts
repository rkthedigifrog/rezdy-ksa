import { Expose, Type } from 'class-transformer';
import { Image } from './Image';
import { PriceOption } from './PriceOption';

export class Product {
  @Expose({ name: 'productCode' })
  code: string = '';

  @Expose()
  description: string = '';

  @Expose()
  @Type(() => Image)
  images: Array<Image> = [];

  @Expose()
  @Type(() => PriceOption)
  priceOptions: Array<PriceOption> = [];
}
