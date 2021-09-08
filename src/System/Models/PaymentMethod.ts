export class PaymentMethod {
  type: string = 'CREDITCARD';
  amount: string = '0';
  currency: string = 'USD';
  date: Date = new Date();
  label: string = 'Payment bypassed';
}
