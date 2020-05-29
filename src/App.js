import React from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import EnrollForm from './Components/EnrollForm.js';
import AddTeacher from './Components/AddTeacher.js';
import AddClass from './Components/AddClass.js';
import LoginForm from './Components/LoginForm';
import Classes from './Components/Classes.js';
import AddAdmin from './Components/AddAdmin';

//student will have a name, age, and class field
//teachers will have a name and class
//classes will be displayed to show the specific teacher and students with the specific class 
//students will have a drop down to show age and other info

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      teachers: [],
      classes: [],
      user: null,
    }
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      })
  }
  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }

  //handles all the pulling from firebase
  componentDidMount() {
    //gets the data from all three type arrays
    const studentRef = firebase.database().ref('students');
    const teacherRef = firebase.database().ref('teachers');
    const classRef = firebase.database().ref('classes');
    //this one takes the students in the snapshot of studentRef and pushes to an array
    //student has 4 fields: id, name, age, and class
    studentRef.on('value', (snapshot) => {
      let students = snapshot.val();
      let stateStudents = [];
      for (let stud in students) {
        stateStudents.push({
          id: stud,
          name: students[stud].name,
          age: students[stud].age,
          class: students[stud].class,
        })
      }
      //sets the students in state to the array made
      this.setState({
        students: stateStudents
      })
    })
    //same as above but teacher has no age field
    teacherRef.on('value', (snapshot) => {
      let teachers = snapshot.val();
      let stateTeachers = [];
      for (let teach in teachers) {
        stateTeachers.push({
          id: teach,
          name: teachers[teach].name,
          class: teachers[teach].class,
        })
      }
      this.setState({
        teachers: stateTeachers
      })
    })
    //same as above but only id and className field
    classRef.on('value', (snapshot) => {
      let classes = snapshot.val();
      let stateClasses = [];
      for (let course in classes) {
        stateClasses.push({
          id: course,
          className: classes[course].className,
        })
      }
      this.setState({
        classes: stateClasses
      })
    })
    //this makes the log in stay even on refresh until logout
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render() {

    return (
      <div className='App'>
        <h1>Welcome to Thomas Jefferson Elementary!</h1>
        <div>
          {this.state.user ?
            <button onClick={this.logout}>Log out</button>
            :
            <div>
              <h4>Super log in here</h4>
              <button onClick={this.login}>Log in</button>
            </div>
          }
        </div>
        <div>
          {this.state.user ?
            <div>
              <AddClass />
              <AddTeacher />
              <EnrollForm />
            </div>
            :
            <div>Please sign in to modify enrollment</div>
          }
        </div>
        <div>
          <h1>Classes</h1>
          <Classes
            students={this.state.students}
            teachers={this.state.teachers}
            classes={this.state.classes}
            user={this.state.user}
          />
        </div>
      </div>
    );
  }
}
//map over classes first
//then map over teachers and whichever one has that class gets added into it
//then map over all students and filter the ones that are in that class
//can replace the lists bullets with drop down cards so can click for more info 

export default App;
