import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {    
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(path); //this is the history stack that keeps track of your browser page history
  }
  
  render() {
    return (
      <div className="main-content home">
        <h2>Home</h2>
        <p>Admin Panel</p>

        <hr />
        
      </div>
    );
  }
}

export default Home;