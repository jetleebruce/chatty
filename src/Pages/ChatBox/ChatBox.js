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
    this.groupChatId = null;
    this.currentPeerUserMessages = [];
    this.removeListener = null;
    this.currentPhotoFile = null;

    firebase
      .firestore()
      .collection("users")
      .doc(this.currentPeerUser.documentkey)
      .get()
      .then((docRef) => {
        this.currentPeerUserMessages = docRef.data().messages;
      });
  }
  componentDidUpdate() {
    this.scrollToBottom();
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
  onSendMessage = (content, type) => {
    let notificationMessages = [];

    if (this.state.isShowSticker && type === 2) {
      this.setState({ isShowSticker: false });
    }
    if (content.trim() === "") {
      return;
    }
    const timestamp = moment().valueOf().toString();
    const itemMessage = {
      idForm: this.currentUserId,
      idTo: this.currentPeerUser.id,
      timestamp: timestamp,
      content: content.trim(),
      type: type,
    };
    firebase
      .firestore()
      .collection("Messages")
      .doc(this.groupChatId)
      .collection(this.groupChatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        this.setState({ inputValue: "" });
      });
    this.currentPeerUserMessages.map((item) => {
      if (item.notificationId !== this.currentUserId) {
        notificationMessages.push({
          notificationId: item.notificationId,
          number: item.number,
        });
      }
    });
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentPeerUser.documentkey)
      .update({ messgaes: notificationMessages })
      .then((data) => {})
      .catch((err) => {
        this.props.showToast(0, err.toString());
      });
  };
  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({});
    }
  };
  onKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onSendMessage(this.state.inputValue, 0);
    }
  };
    openListSticker = () => {
      this.setState({isShowSticker: !this.state.isShowSticker})
  };
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
