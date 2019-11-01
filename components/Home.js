import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {    
  
  handleSubmit = (e) => {
    e.preventDefault();
    let teacherName = this.name.value;
    let teacherTopic = this.topic.value;
    let path = `classes/${teacherTopic}/${teacherName}`;
    this.props.history.push(path); //this is the history stack that keeps track of your browser page history
  }
  
  render() {
    return (
      <div className="main-content home">
        <h2>Home</h2>
        <p>Admin Panel</p>

        <hr />

        {/* <h3>Search</h3>
        
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" ref={(input) => this.name = input} />
          <input type="text" placeholder="Topic" ref={(input) => this.topic = input } />
          <button type="submit">Go!</button>
        </form> */}
      </div>
    );
  }
}

export default Home;