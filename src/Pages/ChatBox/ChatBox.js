import React from "react";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactTostify.css";
import firebase from "../../Services/firebase";
import images from "../../ProjectImages/ProjectImages";
import moment from "react-moment";
import "./ChatBox.css";
import LoginString from "../Login/LoginStrings";

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isShowSticker: false,
    };

    this.currentUserName = localStorage.getItem(LoginString.Name);
    this.currentUserId = localStorage.getItem(LoginString.ID);
    this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
    this.currentUserDocumentId = localStorage.getItem(
      LoginString.FirebaseDocumentId
    );
    this.stateChange = localStorage.getItem(LoginString.UPLOAD_CHANGED);
    this.currentPeerUser = this.props.currentPeerUser;
  }
  render() {
    return <h1>ChatBox</h1>;
  }
}
