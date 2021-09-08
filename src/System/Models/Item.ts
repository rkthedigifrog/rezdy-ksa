import { Participant, extra } from "./Participant";
import { Quantity } from "./Quantity";

export class Item {
  productCode: string = "";
  startTime?: Date;
  startTimeLocal?: Date;
  amount: number = 0;
  quantities: Quantity[] = [];
  participants: Participant[] = [];
  extras: extra[]=[];
}
