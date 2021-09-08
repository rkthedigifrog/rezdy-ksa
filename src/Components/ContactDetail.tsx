import React, { Component } from "react";
import { MdExpandLess } from "react-icons/md";
import { FaAsterisk } from "react-icons/fa";

interface IProps {
  defaultExpanded?: boolean;
}

interface IState {
  isExpanded: boolean;
}

export class ContactDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onToggle = this.onToggle.bind(this);

    this.state = {
      isExpanded: this.props.defaultExpanded ?? false,
    };
  }

  render() {
    let animClass = this.state.isExpanded ? " rotated" : "";
    return (
      <div className="contact-detail">
        <div className="header legend" onClick={this.onToggle}>
          <h4 className="h-5 leading-5">Contact Details</h4>

          <MdExpandLess
            className={"h-5 leading-5 rotable" + animClass}
            size="20"
          />
        </div>
        {this.state.isExpanded && (
          <div className="expanding-con border-t p-2">
            <div className="vd-row">
              <label className="font-bold text-xs">First Name:</label>
              <div className="input-con flex flex-row justify-start items-center">
                <span className="px-2">
                  <FaAsterisk size="6" />
                </span>
                <div className="vr"></div>
                <input
                  className="h-6 leading-6"
                  type="text"
                  minLength={1}
                  required
                  maxLength={500}
                />
              </div>
            </div>
            <div className="vd-row">
              <label className="font-bold text-xs">Last Name:</label>
              <div className="input-con flex flex-row justify-start items-center">
                <span className="px-2">
                  <FaAsterisk size="6" />
                </span>
                <div className="vr"></div>
                <input className="h-6 leading-6" type="text" maxLength={500} />
              </div>
            </div>
            <div className="vd-row">
              <label className="font-bold text-xs">Email:</label>
              <div className="input-con flex flex-row justify-start items-center">
                <span className="px-2">
                  <FaAsterisk size="6" />
                </span>
                <div className="vr"></div>
                <input className="h-6 leading-6" type="email" maxLength={500} />
              </div>
            </div>
            <div className="vd-row">
              <label className="font-bold text-xs">Mobile:</label>
              <div className="input-con flex flex-row justify-start items-center">
                <span className="px-2">
                  <FaAsterisk size="6" />
                </span>
                <div className="vr"></div>
                <input
                  datatype=""
                  className="h-6 leading-6"
                  type="text"
                  maxLength={500}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  onToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }
}
