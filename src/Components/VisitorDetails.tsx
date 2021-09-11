import { AxiosResponse } from "axios";
import { action } from "mobx";
import { observer } from "mobx-react";
import React, { PureComponent } from "react";
import { BookingState } from "../Enums/BookingState";
import { BookingResource } from "../System/Models/BookingResource";
import { Customer } from "../System/Models/Customer";
import { Item } from "../System/Models/Item";

import { Participant, Field, extra } from "../System/Models/Participant";
import { Quantity } from "../System/Models/Quantity";
import { locator } from "../System/ServiceLocator";
import { ApiService } from "../System/Services/ApiService";
import { Store } from "../System/Stores";
import { VisitorDetail } from "./VisitorDetail";
import { format } from "date-fns";
import calenderImage from "../Assets/Images/bg.jpg";

const imageUrl =
  Store.product != null ? Store.product.images[0].largeSizeUrl : calenderImage;

interface IProps {}
interface IState {
  isValidated: boolean;
}

interface KeyValuePair {
  key: string;
  value: boolean;
}

@observer
export class VisitorDetails extends PureComponent<IProps, IState> {
  private visitorElements: JSX.Element[] = [];
  private validationTable: KeyValuePair[] = [];

  private participants: Participant[] = [];

  constructor(props: IProps) {
    super(props);

    this.onValidationChanged = this.onValidationChanged.bind(this);
    this.onDataChanged = this.onDataChanged.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      isValidated: false,
    };

    if (this.visitorElements.length === 0) {
      for (let i = 0; i < Store.visitorCount; i++) {
        this.visitorElements.push(
          <VisitorDetail
            key={"vd-" + i.toString()}
            defaultExpanded={i === 0 ? true : false}
            visitorIndex={i}
            validationChanged={this.onValidationChanged}
            dataChanged={this.onDataChanged}
          />
        );

        this.validationTable.push({
          key: "vd-" + i,
          value: i === 0 ? false : true,
        });

        this.participants.push(new Participant());
      }
    }
  }

  render() {
    let selectedDateText = format(Store.selectedDate!, "MMMM do, yyyy H:mma");
    return (
       <div className="pt-10 visitor-details  h-full pb-4 ">
        <div className=" mx-auto">
        <div className="flex flex-col text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Plan your visit to the Kingdom</h1>
          <h1 className="text-3xl mb-4 font-bold text-black">of Saudi Arabia Pavilion at Expo 2020 Dubai</h1>
          <p  className=" text-black">Plan your visit and book a 20-minute tour of the Pavilion with one of our knowledgeable guides to learn about </p>
          <p  className=" text-black">
Saudi Arabia’s rich heritage, diverse people, vast opportunities and natural wonders</p>
        </div>
        {this.visitorElements}

        <div className="flex flex-row justify-center mt-3 w-full d-none ">
          <button className="button return-btn  px-4  py-1 mr-4  text-xl font-bold text bg-white text-indigo-800 w-full md:w-4/12 lg:w-3/12 md:mx-4" onClick={this.onReturn}>
            <span>Return</span>
          </button>
          <button
            className="button finalize-btn  text-center px-4 py-1 bg-white text-indigo-800 w-full md:w-4/12 lg:w-3/12 md:mx-4"
            disabled={this.state.isValidated ? false : true}
            onClick={this.onClick}
          >
            <span className="text-center w-full text-xl  bg-white text-indigo-800 font-bold">Book Now</span>
            <span className="text-center w-full text-sm bg-white text-indigo-800">(Please enter all required fields)</span>
          </button>
	  </div>
        </div>
      </div>
    );
  }

  async onReturn() {
    Store.setBookingState(BookingState.Initial);
  }

  @action
  async onClick() {
    if (Store.getSelectedDate() != null && this.participants.length > 0) {
      let resource = new BookingResource();

      let customer = new Customer();
      let customerDelta = this.participants[0];

      console.log(customerDelta.fields);

      customerDelta.fields.forEach((field) => {
        if (field.label === "Email") customer.email = field.value;
        else if (field.label === "First Name") customer.firstName = field.value;
        else if (field.label === "Last Name") customer.lastName = field.value;
        else if (field.label === "Mobile") customer.phone = field.value;
        else if (field.label === "Tour Guide Language")
          customer.tourguideLanguage = Store.selectedLanguage;
      });

      resource.customer = customer;

      let item = new Item();
      item.amount = 0;
      item.productCode = Store.product!.code;
      let cust_extras = new extra();
      cust_extras.quantity = Store.Extras;
      item.extras.push(cust_extras);

      let selectedDate = Store.getSelectedDate()!;
      let session = Store.availableSessions?.find(
        (q) => q.startTimeLocal.getTime() === selectedDate.getTime()
      );

      this.participants.forEach((value: Participant) => {
        value.fields.forEach((field) => {
          if (field.label === "Tour Guide Language") {
            field.value = Store.selectedLanguage;
          }
        });
      });

      let extras = { extras: [{ id: 170228, quantity: Store.Extras }] };

      item.startTime = session?.startTime;
      item.participants = this.participants;

      let quantities = Array<Quantity>();

      Store.product?.priceOptions.forEach((priceOption) => {
        let quantity = new Quantity();

        quantity.optionLabel = priceOption.label;
        quantity.value = Store.visitorCount.toString(); //priceOption.seatsUsed;

        quantities.push(quantity);
      });

      item.quantities = quantities;

      resource.items.push(item);

      const apiService = locator(ApiService);
      await apiService.createBooking(resource).then(
        (response) => {
          Store.setBookingState(BookingState.Aftermath);
        },
        (error: AxiosResponse) => {}
      );
    }
  }

  onValidationChanged(key: string, value: boolean) {
    let keyPair = this.validationTable.find((q) => q.key === key);

    if (keyPair != null) {
      keyPair.value = value;
    }

    let isValidated: boolean = !this.validationTable.some(
      (q) => q.value === false
    );

    this.setState({
      isValidated: isValidated,
    });
  }

  onDataChanged(index: number, participant: Participant) {
    this.participants[index] = participant;
  }
}
