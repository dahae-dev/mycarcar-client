import React, { Component } from "react";
import "./AlertModal.css";

interface IAlertModal {
  saveClicked: boolean;
  handleDismiss: () => void;
}

export default class AlertModal extends Component<IAlertModal> {
  constructor(props: IAlertModal) {
    super(props);
  }

  shouldComponentUpdate(nextProps: IAlertModal) {
    return nextProps.saveClicked !== this.props.saveClicked;
  }

  render() {
    return (
      <div className="alert-modal-content">
        <h4>저장된 견적서는 '견적내역보기'에서 확인 가능합니다.</h4>
        <input type="button" value="확인" onClick={this.props.handleDismiss} />
      </div>
    );
  }
}
