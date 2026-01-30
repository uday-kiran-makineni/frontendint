import {Component} from 'react'
class MyComponent extends Component {
    handleClick() {
      console.log(this) //undefined  
    }
    render() {
      return <button onClick={this.handleClick}>Click Me</button>
    }
}

class MyComponent extends Component {
    handleClick = () => {
      console.log(this)  //Mycomponent 
    }
    render() {
      return <button onClick={this.handleClick}>Click Me</button>
    }
  }


  class Counter extends Component {
    state = { count: 0 }
    render() {
      const { count } = this.state;
      return <p className="count">{count}</p>;
    }
  }



  onIncrement = () => {
    this.setState((prevState) =>
      console.log(`previous state value ${prevState.count}`)
    )
  }


  import { Component } from "react"

import "./index.css"

class Counter extends Component {
  state = { count: 0 , isloggedin : false }
  onIncrement = () => {
    this.setState((abc) => ({ count: abc.count + 1 }))
  }
  onDecrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }))
  }
  render() {
    const { count } = this.state
    return (
      <div className="container">
        <h1 className="count">Count {count}</h1>
        <button className="button" onClick={this.onIncrement}>
          Increase
        </button>
        <button className="button" onClick={this.onDecrement}>
          Decrease
        </button>
      </div>
    )
  }
}

export default Counter


conditional rendering 

const Welcome = (props) => {
    const { name, greeting } = props;
    return (
      <h1 className="message">
        {greeting}, {name}
      </h1>
    );
  };
  
  Welcome.defaultProps = {
    name: "Rahul",
    greeting: "Hello"
  };
  
  export default Welcome;

  import { Component } from "react";
import Welcome from "./Welcome";

class App extends Component {
  state = { isLoggedIn: true };
  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="container">
        <Welcome greeting="Hello" />
      </div>
    );
  }
}

export default App;


import {Component} from 'react'
import UserProfile from './components/UserProfile'

import './App.css'

const initialUserDetailsList = [
  {
    uniqueNo: 1,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/esther-howard-img.png',
    name: 'Esther Howard',
    role: 'Software Developer'
  },
  {
    uniqueNo: 2,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/floyd-miles-img.png',
    name: 'Floyd Miles',
    role: 'Software Developer'
  },
  {
    uniqueNo: 3,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/jacob-jones-img.png',
    name: 'Jacob Jones',
    role: 'Software Developer'
  },
  {
    uniqueNo: 4,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/devon-lane-img.png',
    name: 'Devon Lane',
    role: 'Software Developer'
  }
]

class App extends Component {
  state = {
    searchInput: '',
    usersDetailsList: initialUserDetailsList
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value
    })
  }

  deleteUser = uniqueNo => {
    const {usersDetailsList} = this.state
    const filteredUsersData = usersDetailsList.filter(
      each => each.uniqueNo !== uniqueNo
    )
    this.setState({
      usersDetailsList: filteredUsersData
    })
  }

  render() {
    const {searchInput, usersDetailsList} = this.state
    const searchResults = usersDetailsList.filter(eachUser =>
      eachUser.name.includes(searchInput)
    )
    return (
      <div className="app-container">
        <h1 className="title">Users List</h1>
        <input
          type="search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <ul className="list-container">
          {searchResults.map(eachUser => (
            <UserProfile
              userDetails={eachUser}
              key={eachUser.uniqueNo}
              deleteUser={this.deleteUser}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App

import './index.css'

const UserProfile = props => {
  const {userDetails, deleteUser} = props
  const {imageUrl, name, role, uniqueNo} = userDetails
  const onDelete = () => {
    deleteUser(uniqueNo)
  }
  return (
    <li className="user-card-container">
      <img src={imageUrl} className="profile-pic" alt="profile-pic" />
      <div className="user-details-container">
        <h1 className="user-name"> {name} </h1>
        <p className="user-designation"> {role} </p>
      </div>
      <button className="delete-button" onClick={onDelete}>
        <img
          src=""
          alt="cross"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default UserProfile


cd Documents  

npx create-react-app my-new-react-app 
