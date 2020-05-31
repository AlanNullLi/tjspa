import React from 'react';
import './Classes.css';
import { Card, Button } from 'antd';
import firebase from '../firebase.js';

class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //removes student from firebase database
    removeStudent = (studID) => {
        const studentRef = firebase.database().ref('/students/' + studID.toString())
        studentRef.remove()
    }
    //removes teachers from database
    removeTeacher = (teachID) => {
        const teacherRef = firebase.database().ref('/teachers/' + teachID.toString())
        teacherRef.remove()
    }
    removeClass = (classID) => {
        const classRef = firebase.database().ref('/classes/' + classID.toString())
        classRef.remove()
    }

    returnTeacher(className) {
        //checks if teachers isnt empty
        if (this.props.teachers !== null) {
            //makes an array of teacher that has the class, could have multiple but Im only taking one
            const teacher = this.props.teachers.filter(teacher => teacher.class === className)[0]
            //as long as the teacher isnt undefined it will return the teacher name
            if (teacher !== undefined) {
                return (
                    <div className='teacher'>
                        <Card
                            title={teacher.name}
                            extra={
                                this.props.user ?
                                    //shows button if user is logged in as super
                                    <Button
                                        onClick={() => this.removeTeacher(teacher.id)}
                                    >Remove</Button>
                                    :
                                    <div></div>
                            }
                        ></Card>
                    </div>
                )
            } else {
                //tells user to assign a teacher to this class first
                return 'Please assign this class a teacher'
            }
        }
    }
    returnStudents(className) {
        //only returns students in the inputted class
        if (this.props.students !== null) {
            return this.props.students.filter(student => student.class === className)
        }
    }
    render() {
        return (
            //maps through classes in state and returns a card for every class
            //then uses return teacher to return the teacher that corresponds with the class
            //could return multiple but im just setting it up to return 1
            //then uses return students to get students who are in the class and maps through all of those 
            //in a card
            <div className='Classes'>
                {this.props.classes.map(course => {
                    return (
                        <div className='ClassBody'>
                            <Card
                                id='card'
                                title={course.className}
                                extra={
                                    //shows button if the user is logged in as super
                                    this.props.user ?
                                        <Button
                                            onClick={() => this.removeClass(course.id)}
                                        >Remove</Button>
                                        :
                                        <div></div>
                                }
                            >
                                <p>{this.returnTeacher(course.className)}</p>
                                {this.returnStudents(course.className).map(stud => {
                                    return (
                                        <div >
                                            <Card
                                                type='inner'
                                                title={stud.name}
                                                extra={this.props.user ?
                                                    //shows button if user is logged in as super
                                                    <Button
                                                        onClick={() => this.removeStudent(stud.id)}
                                                        style={{ marginLeft: 20 }}
                                                    >Remove</Button>
                                                    :
                                                    <div></div>}
                                            >
                                                <p>Age: {stud.age}</p>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </Card>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Classes;