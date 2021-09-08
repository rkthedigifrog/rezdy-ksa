import { classToPlain, deserializeArray } from 'class-transformer';
import { IApiService } from '../Interfaces/IApiService';
import { IService } from '../Interfaces/IService';
import { MainAxios } from '../MainAxios';
import { BookingResource } from '../Models/BookingResource';
import { Product } from '../Models/Product';
import { Session } from '../Models/Session';

export class ApiService implements IService, IApiService {
  getType(): string {
    return this.constructor.name;
  }

  async getProducts(): Promise<Product[] | null> {
    const axios = MainAxios.GetInstance();
    const response = await axios.get('/products');

    if (response != null && response.status === 200) {
      let products: Product[] = deserializeArray(
        Product,
        JSON.stringify(response.data['products']),
        {
          excludeExtraneousValues: true,
        }
      );

      return products;
    }

    return [];
  }

  async getAvailabilitiesFor(productCode: string): Promise<Session[] | null> {
    const axios = MainAxios.GetInstance();
    const response = await axios.get(
      '/availability?productCode=' + productCode
    );

    if (response != null && response.status === 200) {
      let sessions: Session[] = deserializeArray(
        Session,
        JSON.stringify(response.data['sessions'])
      );

      return sessions;
    }

    return [];
  }

  async createBooking(resource: BookingResource): Promise<any> {
    const axios = MainAxios.GetInstance();
    
    const response = await axios.post('/booking', classToPlain(resource), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (
      response != null &&
      (response.status === 201 || response.status === 200)
    ) {
    }
  }
}
