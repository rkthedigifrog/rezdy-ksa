import { Customer } from "./Customer";
import { Item } from "./Item";
import { Field } from "./Participant";
import { PaymentMethod } from "./PaymentMethod";

export class BookingResource {
  customer?: Customer;
  items: Item[] = [];
  fields: Field[] = [];
  comments: string = "";
  resellerComments: string = "";
  payments: PaymentMethod = new PaymentMethod();
  language: string = "English";
}
