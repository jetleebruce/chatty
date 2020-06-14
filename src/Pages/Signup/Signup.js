import React from "react";
import Header from "../../Components/Header";
import firebase from "../../Services/firebase";
import LoginString from "../Login/LoginStrings";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    const { name, password, email } = this.state;
    event.preventDefault();
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: result.user.uid,
              email,
              password,
              URL: "",
              description: "",
              messages: [{ notificationId: "", number: 0 }],
            })
            .then((docRef) => {
              localStorage.setItem(LoginString.ID, result.user.uid);
              localStorage.setItem(LoginString.Name, name);
              localStorage.setItem(LoginString.Email, email);
              localStorage.setItem(LoginString.Password, password);
              localStorage.setItem(LoginString.PhotoURL, "");
              localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
              localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
              this.setState({
                name: "",
                password: "",
                url: "",
              });
              this.props.history.push("/chat");
            })
            .catch((error) => {
              console.error("Error editing document", error);
            });
        });
    } catch (error) {
      document.getElementById("1").innerHTML =
        "error in sign in please try again";
    }
  }
  render() {
    return (
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
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Name
              </label>
              <input
                className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='name'
                placeholder='name'
                name='name'
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Sign In
              </button>
            </div>
            <p id='1'></p>
          </form>
        </div>
      </div>
    );
  }
}
