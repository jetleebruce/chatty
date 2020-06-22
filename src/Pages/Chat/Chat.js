import React from "react";
import LoginString from "../Login/LoginStrings";
import firebase from "../../Services/firebase";
import "./Chat.css";
import images from "../../ProjectImages/ProjectImages";
import ChatBox from "../ChatBox/ChatBox";
import WelcomeBoard from "../Welcome/Welcome";
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null,
      displayedContacts: [],
      displayedContactswithNotification: [],
    };

    this.currentUserDocumentId = localStorage.getItem(
      LoginString.FirebaseDocumentId
    );
    this.currentUserId = localStorage.getItem(LoginString.ID);
    this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);

    this.currentUserName = localStorage.getItem(LoginString.Name);
    this.currentUserMessages = [];

    this.searchUsers = [];
    this.displayedContacts = [];
    this.currentUserMessages = [];
    this.notificationMessagesErase = [];
    this.getListUsers = this.getListUsers.bind(this);
    this.renderListUser = this.renderListUser.bind(this);
    this.notificationErase = this.notificationErase.bind(this);
  }
  logout = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
    localStorage.clear();
  };
  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  componentDidMount() {
    let notificationMessages = [];
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .get()
      .then((doc) => {
        doc.data().messages.map((item) => {
          this.currentUserMessages.push({
            notificationId: item.notificationId,
            number: item.number,
          });
        });
        this.setState({
          displayedContactswithNotification: this.currentUserMessages,
        });
      });
    this.getListUsers();
  }

  getListUsers = async () => {
    const result = await firebase.firestore().collection("users").get();
    if (result.docs.length > 0) {
      let listUsers = [];
      listUsers = [...result.docs];
      listUsers.forEach((item, index) => {
        this.searchUsers.push({
          key: index,
          documentkey: item.id,
          id: item.data().id,
          name: item.data().name,
          messages: item.data().messages,
          URL: item.data().URL,
          description: item.data().description,
        });
      });

      this.setState({ isLoading: false });
    }

    this.renderListUser();
  };

  getClassnameforUserandNotification = (itemId) => {
    let number = 0;
    let className = "";
    let check = false;
    if (
      this.state.currentPeerUser &&
      this.state.currentPeerUser.id === itemId
    ) {
      className = "viewWrapItemFocused";
    } else {
      this.state.displayedContactswithNotification.forEach((item) => {
        if (item.notificationId.length > 0) {
          if (item.notificationId === itemId) {
            check = true;
            number = item.number;
          }
        }
      });
      if (check === true) {
        className = "viewWrapItemNotification";
      } else {
        className = "viewWrapItem";
      }
    }
    return className;
  };
  notificationErase = (itemId) => {
    this.state.displayedContactswithNotification.forEach((el) => {
      if (el.notificationId.length > 0) {
        if (el.notificationId !== itemId) {
          this.notificationMessagesErase.push({
            notificationId: el.notificationId,
            number: el.number,
          });
        }
      }
    });
    this.updaterenderlist();
  };
  updaterenderlist = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .update({ messages: this.notificationMessagesErase });
    this.setState({
      displayedContactswithNotification: this.notificationMessagesErase,
    });
  };

  renderListUser = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let classname = "";
      this.searchUsers.map((item) => {
        if (item.id !== this.currentUserId) {
          classname = this.getClassnameforUserandNotification(item.id);
          viewListUser.push(
            <button
              id={item.key}
              className={classname}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({
                  currentPeerUser: item,
                  displayedContactswithNotification: this
                    .notificationMessagesErase,
                });
                document.getElementById(item.key).style.backgroundColor =
                  "#fff";
                if (document.getElementById(item.key)) {
                  document.getElementById(item.key).style.color = "#fff";
                }
              }}
            >
              <img
                className='viewAvatarItem'
                src={item.URL}
                alt=''
                placeholder={images.emptyphoto}
              />

              <div className='viewWrapContentItem'>
                <span className='textItem'>{`${item.name}`}</span>
              </div>
              {classname === "viewWrapItemNotification" ? (
                <div className='notificationpragraph'>
                  <p id={item.key} className='newmessages'>
                    New messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      console.log("No user is present");
    }
  };
  searchHandler = (event) => {
    let searchQuery = event.target.value.toLowerCase(),
      displayedContacts = this.searchUsers.filter((el) => {
        let SearchValue = el.name.toLowerCase();
        return SearchValue.indexOf(searchQuery) !== -1;
      });
    this.displayedContacts = displayedContacts;
    this.displaySearchedContacts();
  };

  displaySearchedContacts = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let classname = "";
      this.displayedContacts.map((item) => {
        if (item.id !== this.currentUserId) {
          classname = this.getClassnameforUserandNotification(item.id);
          viewListUser.push(
            <button
              id={item.key}
              className={classname}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({
                  currentPeerUser: item,
                  displayedContactswithNotification: this
                    .notificationMessagesErase,
                });
                document.getElementById(item.key).style.backgroundColor =
                  "#fff";
                if (document.getElementById(item.key)) {
                  document.getElementById(item.key).style.color = "#fff";
                }
              }}
            >
              <img
                className='viewAvatarItem'
                src={item.URL}
                alt=''
                placeholder={images.emptyphoto}
              />

              <div className='viewWrapContentItem'>
                <span className='textItem'>{`${item.name}`}</span>
              </div>
              {classname === "viewWrapItemNotification" ? (
                <div className='notificationpragraph'>
                  <p id={item.key} className='newmessages'>
                    New messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      console.log("No user is present");
    }
  };
  render() {
    return (
      <div className='flex flex-col text-center items-center'>
        <div
          className='flex flex-row'
          style={{ padding: `40px 18px`, width: `100%`, height: `100vh` }}
        >
          <div className='overflow-y-scroll w-3/12 relative'>
            <div
              className='flex justify-between w-full p-4 '
              style={{ backgroundColor: `#ededed` }}
            >
              <img
                className='w-12 h-12 rounded-full object-cover'
                alt=''
                src={this.currentUserPhoto}
                onClick={this.onProfileClick}
              />
              <button className='flex flex-col mt-1' onClick={this.logout}>
                <i className='fa fa-sign-out ml-4'></i>
                <p className='text-xs'>Выход</p>
              </button>
            </div>
            <div
              className=''
              style={{
                height: `49px`,
                position: `relative`,
                boxSizing: `border-box`,
                borderBottom: `1px solid #ededed`,
              }}
            >
              <div className='flex items-center '>
                <i className='fa fa-search ml-3'></i>
                <input
                  className='w-full m-4'
                  type='text'
                  onChange={this.searchHandler}
                  placeholder='Поиск или новый чат'
                />
              </div>
            </div>
            {this.state.displayedContacts}
          </div>
          <div className='flex flex-1' style={{ maxHeight: `90vh` }}>
            {this.state.currentPeerUser ? (
              <ChatBox
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
              <WelcomeBoard
                currentUserName={this.currentUserName}
                currentUserPhoto={this.currentUserPhoto}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
