import React from 'react';
import './Adding.css';
import { Input, Button, Form } from 'antd';
import firebase from '../firebase.js';

class EnrollForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentName: '',
            currentAge: '',
            currentClass: '',
        }
    }

    //handles the input and assigns to state
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //adds student to firebase with a name age class fields
    handleEnroll = (e) => {
        console.log('running')
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
            currentName: '',
            currentClass: '',
        })
    }

    render() {
        return (

            <div className='EnrollForm'>
                Enroll New Student
                <Form id='form'>
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
                        value={this.currentClass}
                        onChange={this.handleInput}
                    />
                    <Button
                        type='submit'
                        onClick={this.handleEnroll}
                    >Enroll Student</Button>
                </Form>
            </div>

        )
    }


}

export default EnrollForm;