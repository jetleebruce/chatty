import React from "react";
import LoginString from "../Login/LoginStrings";
import { Link } from "react-router-dom";
import firebase from "../../Services/firebase";

import Header from "../../Components/Header";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    if (localStorage.getItem(LoginString.ID)) {
      this.setState({ isLoading: false }, () => {
        this.setState({ isLoading: false });
        this.props.showToast(1, "Login succes");
        this.props.history.push("./chat");
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (result) => {
        let user = result.user;
        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                const currentdata = doc.data();
                localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
                localStorage.setItem(LoginString.ID, currentdata.id);
                localStorage.setItem(LoginString.Name, currentdata.name);
                localStorage.setItem(LoginString.Email, currentdata.email);
                localStorage.setItem(
                  LoginString.Password,
                  currentdata.password
                );
                localStorage.setItem(LoginString.PhotoURL, currentdata.URL);
                localStorage.setItem(
                  LoginString.Description,
                  currentdata.description
                );
              });
            });
        }
        this.props.history.push("/chat");
      })
      .catch(function (error) {
        document.getElementById("1").innerHTML =
          "incorrect email/password or poor internet";
      });
  }
  render() {
    return (
      <div>
        <div>
          <Header />
          <div className='w-full flex justify-center'>
            <form
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              onSubmit={this.handleSubmit}
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Password
                </label>
                <input
                  className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='password'
                  name='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </div>

              <div className='flex items-center justify-between'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Login
                </button>
              </div>
              <p id='1'></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
