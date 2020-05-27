import React from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { Input, Card } from 'antd';

//student will have a name, age, and class field
//teachers will have a name and class
//classes will be displayed to show the specific teacher and students with the specific class 
//students will have a drop down to show age and other info
//

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentName: '',
      currentAge: '',
      currentClass: '',
      newTeacherN: '',
      newTeacherC: '',
      newClass: '',
      students: [],
      teachers: [],
      classes: [],
      user: null,
    }
    //I think these all need to be binded since I am writing methods like normal java and no arrows
    this.handleInput = this.handleInput.bind(this);
    this.handleEnroll = this.handleEnroll.bind(this);
    this.handleAddTeacher = this.handleAddTeacher.bind(this);
    this.handleAddClass = this.handleAddClass.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  //handles the input and assigns to state
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //adds student to firebase with a name age class fields
  handleEnroll(e) {
    e.preventDefault();
    const studentRef = firebase.database().ref('students')
    const student = {
      name: this.state.currentName,
      age: this.state.currentAge,
      class: this.state.currentClass,
    }
    studentRef.push(student)
    this.setState({
      currentAge: '',
      currentClass: '',
      currentName: '',
    })
  }
  //adds teacher to firebase with a name and class field
  handleAddTeacher(e) {
    e.preventDefault();
    const teacherRef = firebase.database().ref('teachers')
    const teacher = {
      name: this.state.newTeacherN,
      class: this.state.newTeacherC,
    }
    teacherRef.push(teacher);
    this.setState({
      newTeacherN: '',
      newTeacherC: '',
    })
  }
  //adds a class to firebase
  handleAddClass(e) {
    e.preventDefault();
    const classRef = firebase.database().ref('classes')
    const course = { className: this.state.newClass }
    classRef.push(course);
    this.setState({ newClass: '' })
  }
  //removes student from firebase database
  removeStudent(studID) {
    const studentRef = firebase.database().ref('/students/' + studID.toString())
    studentRef.remove()
  }

  returnTeacher(className) {
    //checks if teachers isnt empty
    if (this.state.teachers !== null) {
      //makes an array of teacher that has the class, could have multiple but Im only taking one
      const teacher = this.state.teachers.filter(teacher => teacher.class === className)[0]
      //as long as the teacher isnt undefined it will return the teacher name
      if (teacher !== undefined) {
        return teacher.name
      } else {
        //tells user to assign a teacher to this class first
        return 'Please assign this class a teacher'
      }
    }
  }
  returnStudents(className) {

    if (this.state.students !== null) {
      return this.state.students.filter(student => student.class === className)
    }
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      })
  }
  logout() {
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
      <div className='app'>
        <header>Welcome to Thomas Jefferson Elementary!</header>
        <div>
          <h6>Log in here</h6>
          {this.state.user ?
            <button onClick={this.logout}>Log out</button>
            :
            <button onClick={this.login}>Log in</button>
          }
        </div>
        <div>
          {this.state.user ?
            <div>
              Enroll New Student
              <form onSubmit={this.handleEnroll}>
                <Input
                  name='currentName'
                  placeholder='enter student name'
                  value={this.state.currentName}
                  onChange={this.handleInput}
                />
                <Input
                  name="currentAge"
                  placeholder='enter student age'
                  value={this.state.currentAge}
                  onChange={this.handleInput}
                />
                <Input
                  name="currentClass"
                  placeholder='assigned class'
                  value={this.state.currentClass}
                  onChange={this.handleInput}
                />
                <button >Enroll Student</button>
              </form>
              <form onSubmit={this.handleAddTeacher}>
                <Input
                  name='newTeacherN'
                  placeholder='new teacher name'
                  value={this.state.newTeacherN}
                  onChange={this.handleInput}
                />
                <Input
                  name='newTeacherC'
                  placeholder="teacher's class"
                  value={this.state.newTeacherC}
                  onChange={this.handleInput}
                />
                <button>Add New Teacher</button>
              </form>
              <form onSubmit={this.handleAddClass}>
                <Input
                  name='newClass'
                  placeholder='new class'
                  value={this.state.newClass}
                  onChange={this.handleInput}
                />
                <button>Add New Class</button>
              </form>
            </div>
            :
            <div>Please sign in to modify enrollment</div>
          }
        </div>
        <div>
          <h1>Classes</h1>
          {this.state.classes.map(course => {
            return (
              <Card title={course.className} style={{}}>
                <p>{this.returnTeacher(course.className)}</p>
                <ul>
                  <li>{this.returnStudents(course.className).map(stud => {
                    return (
                      <div>
                        <li key={stud.id}>{stud.name}, age:{stud.age}</li>
                        {this.state.user ?
                          <button onClick={() => this.removeStudent(stud.id)}>Remove Student</button>
                          :
                          <div></div>
                        }
                      </div>
                    )
                  })}</li>
                </ul>
              </Card>
            )
          })}
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
