import { BookingResource } from '../Models/BookingResource';
import { Product } from '../Models/Product';
import { Session } from '../Models/Session';

export interface IApiService {
  getProducts(): Promise<Product[] | null>;
  getAvailabilitiesFor(productCode: string): Promise<Session[] | null>;
  createBooking(resource: BookingResource): Promise<any>;
}
