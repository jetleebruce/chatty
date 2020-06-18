import React from "react";
import "./Welcome.css";

export default class WelcomeCard extends React.Component {
  render() {
    return (
      <div className='viewWelcomeBoard'>
        <img
          className='avatarWelcome'
          src={this.props.currentUserPhoto}
          alt=''
        />
        <span className='textTileWelcome'>{`Hey, ${this.props.currentUserName}`}</span>
        <span className='textDescriptionWelcome'>
          Private connection for the private world
        </span>
      </div>
    );
  }
}
