import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { addReminder } from '../actions';
import { deleteReminder } from '../actions';
import { clearReminders } from '../actions';

import './App.css';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }
  
  addR(){
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  
  deleteR(id){
    this.props.deleteReminder(id);
  }
  
  clearR(){
    this.props.clearReminders();
  }
  
  renderReminders() {
    const reminders = this.props.reminders;
    return(
      <ul className="list-group">
        {
          reminders.map(reminder =>{
            return(
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">{reminder.text}</div>
                <div className="list-item">{reminder.dueDate}</div>
                <div className="list-item">{moment(new Date(reminder.dueDate)).fromNow()}</div>
                <div className="list-item text-right">
                  <button 
                    className="btn btn-xs x"
                    onClick={() => this.deleteR(reminder.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  
  render(){
    
    return(
      <div className="App container-fluid">
        <div className="row col-md-12">
          <div className="title row text-center">
            Remainder Pro
          </div>
          <div className="form-group container">
            <input
              className="form-control form-group"
              placeholder="I have to..."
              onChange={
                event => this.setState({
                  text: event.target.value
                  })
              } 
            />
            <input
              className="form-control form-group"
              type="datetime-local"
              placeholder="Choose a date"
              onChange={
                event => this.setState({
                  dueDate: event.target.value
                  })
              } 
            />
            <button
              type="button"
              className="btn btn-success btn-block form-group my-button"
              onClick={() => this.addR()}
            >
            Add  
            </button>
            <button
              type="button"
              className="btn btn-danger btn-block form-group my-button"
              onClick={() => this.clearR()}
            >
            Clear all
            </button>
            
            { this.renderReminders() }
            
          </div>
        </div>
      </div>
    )  
  }

}

function mapStateToProps(s){
  console.log('state', s);
  return {
    'reminders': s,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);