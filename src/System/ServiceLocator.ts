import { IService } from './Interfaces/IService';
import { ApiService } from './Services/ApiService';

export type Newable<T> = { new (...args: any[]): T };

export function locator<T extends IService>(type: Newable<T>) {
  const instance = ServiceLocator.GetInstance();
  return instance.getServices(type) as T;
}

export class ServiceLocator {
  private services: { [type: string]: IService } = {};

  private static Instance: ServiceLocator;

  constructor() {
    this.services['ApiService'] = new ApiService();
  }

  public static GetInstance() {
    if (ServiceLocator.Instance == null)
      ServiceLocator.Instance = new ServiceLocator();

    return ServiceLocator.Instance;
  }

  public getServices<T extends IService>(type: Newable<T>): T {
    let result: T | undefined;

    for (const key in this.services) {
      if (key === type.name) {
        result = this.services[key] as T;

        break;
      }
    }

    return result as T;
  }
}
