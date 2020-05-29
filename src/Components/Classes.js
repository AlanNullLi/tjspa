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
                    <div>
                        {teacher.name}
                        <Button
                            onClick={() => this.removeTeacher(teacher.id)}
                        >Remove</Button>
                    </div>
                )
            } else {
                //tells user to assign a teacher to this class first
                return 'Please assign this class a teacher'
            }
        }
    }
    returnStudents(className) {

        if (this.props.students !== null) {
            return this.props.students.filter(student => student.class === className)
        }
    }
    render() {
        return (
            <div className='Classes'>
                {this.props.classes.map(course => {
                    return (
                        <div className='ClassBody'>
                            <Card className='Card'>
                                <h2>{course.className}</h2>
                                <Button
                                    onClick={() => this.removeClass(course.id)}
                                >Remove</Button>
                                <p>{this.returnTeacher(course.className)}</p>
                                {this.returnStudents(course.className).map(stud => {
                                    return (
                                        <div >
                                            <li key={stud.id} style={{ marginBottom: 5 }}>{stud.name}, age:{stud.age}</li>
                                            {this.props.user ?
                                                <Button
                                                    onClick={() => this.removeStudent(stud.id)}
                                                    style={{ marginLeft: 20 }}
                                                >Remove</Button>
                                                :
                                                <div></div>
                                            }
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