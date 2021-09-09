import { action, computed, makeObservable, observable } from "mobx";
import { BookingState } from "../Enums/BookingState";
import { Product } from "./Models/Product";
import { Session } from "./Models/Session";

class LogicStore {
  bookingState: BookingState = BookingState.Initial;
  visitorCount: number = 1;
  product: Product | null = null;
  availableSessions: Session[] | null = null;
  selectedDate: Date | null = null;
  selectedLanguage: string = "English";
  Extras: number = 0;

  constructor() {
    makeObservable(this, {
      bookingState: observable,
      visitorCount: observable,
      product: observable,
      availableSessions: observable,
      selectedDate: observable,
      selectedLanguage: observable,
      Extras: observable,

      setBookingState: action,
      setProduct: action,
      setAvailableSessions: action,
      setVisitorsCount: action,
      setSelectedDate: action,
      setLanguage: action,
      setExtras: action,
    });
  }

  setBookingState(value: BookingState) {
    this.bookingState = value;
    console.log("BookingStateChanged:", value);
  }

  setProduct(value: Product) {
    this.product = value;
  }

  setAvailableSessions(value: Session[]) {
    this.availableSessions = value;
  }

  setVisitorsCount(value: number) {
    console.log("vistor count",value)
    this.visitorCount = value;
  }

  setSelectedDate(date: Date) {
    console.log("Booking Target Date:", date);
    this.selectedDate = date;
  }

  setLanguage(language: string) {
    console.log("Booking Target language:", language);
    this.selectedLanguage = language;
  }

  setExtras(extras: number) {
    console.log("Wheelchairs :", extras);
    this.Extras = extras;
  }
  @computed
  getMinDate(): Date | null {
    const firstSession =
      this.availableSessions != null && this.availableSessions.length > 0
        ? this.availableSessions[0]
        : null;

    return firstSession != null ? firstSession.startTimeLocal : new Date();
  }

  @computed
  getMaxDate(): Date | null {
    const lastSession =
      this.availableSessions != null && this.availableSessions.length > 0
        ? this.availableSessions[this.availableSessions.length - 1]
        : null;

    return lastSession != null
      ? lastSession.endTimeLocal
      : new Date(2022, 1, 1);
  }

  @computed
  getAvailableHours(): Date[] {
    if (this.selectedDate != null && Store.availableSessions != null) {
      let day = this.selectedDate.getUTCDate();

      let availableHours = Store.availableSessions
        ?.filter((q) => q.startTime.getUTCDate() === day)
        .map((value) => value.startTimeLocal);

      return availableHours;
    }

    return [];
  }

  @computed
  getFirstAvailableHour(): Date | null {
    const available = this.getAvailableHours();
    if (available.length > 0) return available[0];

    return null;
  }

  @computed
  getLastAvailableHour(): Date | null {
    const available = this.getAvailableHours();
    if (available.length > 0) return available[available.length - 1];

    return null;
  }

  @computed
  getSelectedDate() {
    let minDate = this.getMinDate();

    if (minDate != null) {
      if (this.selectedDate == null || this.selectedDate < minDate)
        this.setSelectedDate(minDate);
    }

    return this.selectedDate;
  }

  @computed
  getTimeComponent(): string {
    let timeView = "00:00";

    if (this.selectedDate != null)
      timeView = `${this.selectedDate
        ?.getHours()
        .toString()
        .padStart(2, "0")}:${this.selectedDate
        ?.getMinutes()
        .toString()
        .padStart(2, "0")}`;

    return timeView;
  }

  /*@computed
  onObserveChanges() {

    let maxDate =
      

    if (this.state.selectedDate == null) {
      this.setState(
        {
          minDate: minDate,
          maxDate: maxDate,
          selectedDate: minDate,
        },
        () => this.onDateSelected(this.state.selectedDate)
      );

      console.log('MinDate:', minDate);
      console.log('MaxDate:', maxDate);
      console.log('Selected Date:', this.state.selectedDate);
    }
  }*/
}

export const Store = new LogicStore();
