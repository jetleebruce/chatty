import React from "react";
import ReactLoading from "react-loading";
// import "react-toastify/dist/ReactTostify.css";
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
      inputValue: "",
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
  componentWillReceiveProps(newProps) {
    if (newProps.currentPeerUser) {
      this.currentPeerUser = newProps.currentPeerUser;
      //this.getListHistory()
    }
  }
  componentDidMount() {
    //this.getListHistory()
  }
  render() {
    return (
      <div className='viewChatBoard'>
        <div className='headerChatBoard'>
          <img
            className='viewAvatarItem'
            src={this.currentPeerUser.URL}
            alt=''
          />
          <span className='textHeaderChatBoard'>
            <p style={{ fontSize: `20px` }}>{this.currentPeerUser.name}</p>
          </span>
          <div className='aboutme'>
            <span>
              <p>{this.currentPeerUser.description}</p>
            </span>
          </div>
        </div>
        <div className='viewListContentChat'>
          {/* {} */}
          <div
            style={{ float: `left`, clear: `both` }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </div>
        {this.state.isShowSticker ? this.renderSticker() : null}
        <div className='viewBottom'>
          <img
            className='icOpenGallery'
            src={images.input_file}
            alt='input_file'
            onClick={() => {
              this.refInput.click();
            }}
          />
          <img
            className='viewInputGallery'
            accept='images/*'
            type='file'
            onChange={this.onChoosePhoto}
            alt="image"
          />
          <img
            className='icOpenSticker'
            src={images.sticker}
            alt='icon sticker'
            onClick={this.openListSticker}
          />
          <input
            className='viewInput'
            placeholder='Type a message'
            value={this.state.inputValue}
            onChange={(event) => {
              this.setState({ inputValue: event.target.value });
            }}
            onKeyPress={this.onKeyPress}
          />

          <img
            className='icSend'
            src={images.send}
            alt='icon send'
            onClick={() => {
              this.onSendMessage(this.state.inputValue, 0);
            }}
          />
        </div>
      </div>
    );
  }
  renderSticker = () => {
    return (
      <div className='viewStickers'>
        <img
          className='imgSticker'
          src={images.rock}
          alt='sticker'
          onClick={() => {
            this.onSendMessage("rock", 2);
          }}
        />
        <img
          className='imgSticker'
          src={images.mimi1}
          alt='sticker'
          onClick={() => {
            this.onSendMessage("mimi1", 2);
          }}
        />
        <img
          className='imgSticker'
          src={images.mimi2}
          alt='sticker'
          onClick={() => {
            this.onSendMessage("mimi2", 2);
          }}
        />
        <img
          className='imgSticker'
          src={images.mimi4}
          alt='sticker'
          onClick={() => {
            this.onSendMessage("mimi4", 2);
          }}
        />
        <img
          className='imgSticker'
          src={images.mimi5}
          alt='sticker'
          onClick={() => {
            this.onSendMessage("mimi5", 2);
          }}
        />
      </div>
    );
  };
}
