import React, { Component } from "react";
import { MdExpandMore } from "react-icons/md";
import { FaAsterisk } from "react-icons/fa";
import { Field, Participant } from "../System/Models/Participant";

interface IProps {
  defaultExpanded?: boolean;
  visitorIndex: number;
  validationChanged(key: string, value: boolean): void;
  dataChanged(index: number, participant: Participant): void;
}

interface IState {
  isExpanded: boolean;
  nameValidated: boolean;
  lastNameValidated: boolean;
  emailValidated: boolean;
  name: string;
  lastName: string;
  email: string;
  mobile: string;
}

export class VisitorDetail extends Component<IProps, IState> {
  private participant?: Participant;

  constructor(props: IProps) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onLastNameChanged = this.onLastNameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onMobileChanged = this.onMobileChanged.bind(this);

    this.state = {
      isExpanded: this.props.defaultExpanded ?? false,
      nameValidated: false,
      lastNameValidated: false,
      emailValidated: this.props.visitorIndex === 0 ? false : true,
      name: "",
      lastName: "",
      email: "",
      mobile: "",
    };
  }

  render() {
    let animClass = this.state.isExpanded ? " rotated" : "";

    return (
          <div className="relative visitor-sep">
      <img className="w-screen z-0" src="https://img.rezdy.com/PRODUCT_IMAGE/194530/1788390_lg.jpg" alt="KSA Pavilion" />
      <div className="absolute inset-0  z-100 set-z-index">
        <div className="container sm:pt-10 md:pt-16 max-w-6xl mx-auto">
          <div className="visitor-detail w-full  text-white border-0">
            <div className="header legend" onClick={this.onToggle}>
              <h4 className="h-5 leading-5 text-3xl text-center mb-8 text-white font-bold w-11/12 my-3">
                Visitor {this.props.visitorIndex + 1}
              </h4>
              <MdExpandMore
                className={"h-5 leading-5 rotable" + animClass}
                size="20"
              />
            </div>
            {this.state.isExpanded && (
              <div className="expanding-con  p-2">
                <div className="vd-row my-4">
                  <label className="font-bold text-base text-white">First Name:</label>
                  <div className="input-con flex flex-row justify-start items-center  h-10">
                    
                    <input
                      className="h-6 leading-6 w-full border-2 border-white bg-transparent focus:ring-2 focus:ring-red-600  h-full text-black"
                      type="text"
                      minLength={1}
                      required
                      maxLength={500}
                      value={this.state.name}
                      onChange={(event) => this.onNameChanged(event)}
                    />
                  </div>
                </div>
                <div className="vd-row my-4">
                  <label className="font-bold text-base text-white">Last Name:</label>
                  <div className="input-con flex flex-row justify-start items-center  h-10">
                    
                    <input
                      className="h-6 leading-6 w-full border-2 border-white bg-transparent focus:ring-2 focus:ring-red-600 h-full text-black "
                      type="text"
                      maxLength={500}
                      value={this.state.lastName}
                      onChange={this.onLastNameChanged}
                    />
                  </div>
                </div>
                <div className="vd-row my-4">
                  <label className="font-bold text-base text-white">Email:</label>
                  {this.props.visitorIndex === 0 ? (
                    <div className="input-con flex flex-row justify-start items-center  h-10">
                    

                      <input
                        className="h-6 leading-6 w-full border-2 border-white bg-transparent focus:ring-2 focus:ring-red-600  h-full text-black"
                        type="email"
                        maxLength={500}
                        value={this.state.email}
                        onChange={this.onEmailChanged}
                      />
                    </div>
                  ) : (
                    <div className="input-con flex flex-row justify-start items-center  h-10">
                      <input
                        className="h-6 leading-6 w-full border-2 border-white bg-transparent focus:ring-2 focus:ring-red-600  h-full text-black"
                        type="email"
                        value={this.state.email}
                        maxLength={500}
                        onChange={this.onEmailChanged}
                      />
                    </div>
                  )}
                </div>
                <div className="vd-row my-4">
                  <label className="font-bold text-base text-white">Mobile:</label>
                  <div className="input-con flex flex-row justify-start items-center  h-10">
                    <input
                      datatype=""
                      className="h-6 leading-6 w-full h-full text-black border-2 border-white bg-transparent"
                      type="text"
                      value={this.state.mobile}
                      maxLength={500}
                      onChange={this.onMobileChanged}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
         
        
        </div>
      </div>
    </div>
    );
  }

  onToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  onNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        name: event.target.value,
        nameValidated: event.target.value.length > 0,
      },
      this.checkOnValidated
    );
  }

  onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        lastName: event.target.value,
        lastNameValidated: event.target.value.length > 0,
      },
      this.checkOnValidated
    );
  }

  onEmailChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        email: event.target.value,
        emailValidated:
          this.props.visitorIndex === 0
            ? event.target.value.length > 0 && event.target.validity.valid
            : true,
      },
      this.checkOnValidated
    );
  }

  onMobileChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        mobile: event.target.value,
      },
      this.checkOnValidated
    );
  }

  getParticipantData(): Participant {
    if (this.participant == null) this.participant = new Participant();

    this.participant.fields = [];
    let nameField = new Field();
    nameField.label = "First Name";
    nameField.value = this.state.name;

    let lastNameField = new Field();
    lastNameField.label = "Last Name";
    lastNameField.value = this.state.lastName;

    let emailField = new Field();
    emailField.label = "Email";
    emailField.value = this.state.email;

    let mobileField = new Field();
    mobileField.label = "Mobile";
    mobileField.value = this.state.mobile;

    let tourguideField = new Field();
    tourguideField.label = "Tour Guide Language";
    tourguideField.value = "";

    this.participant.fields.push(nameField);
    this.participant.fields.push(lastNameField);
    this.participant.fields.push(emailField);
    this.participant.fields.push(mobileField);
    this.participant.fields.push(tourguideField);

    return this.participant;
  }

  checkOnValidated() {
    this.props.dataChanged(this.props.visitorIndex, this.getParticipantData());

    if (this.props.visitorIndex > 0)
      this.props.validationChanged("vd-" + this.props.visitorIndex, true);
    else {
      if (
        this.state.nameValidated &&
        this.state.lastNameValidated &&
        this.state.emailValidated
      )
        this.props.validationChanged("vd-" + this.props.visitorIndex, true);
      else this.props.validationChanged("vd-" + this.props.visitorIndex, false);
    }
  }
}
