import React from 'react';
import './Adding.css';
import { Input, Button, Form } from 'antd';
import firebase from '../firebase.js';


class AddTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTeacherN: '',
            newTeacherC: '',
        }
    }

    //handles the input and assigns to state
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //adds teacher to firebase with a name and class field
    handleAddTeacher = (e) => {
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

    render() {

        return (
            <div className='AddTeacher'>
                <b>Add New Teacher</b>
                <Form id='form'>
                    <Form.Item>
                        <Input
                            name='newTeacherN'
                            placeholder='new teacher name'
                            value={this.state.newTeacherN}
                            onChange={this.handleInput}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            name='newTeacherC'
                            placeholder="teacher's class"
                            value={this.state.newTeacherC}
                            onChange={this.handleInput}
                        />
                    </Form.Item>
                    <Button
                        type='submit'
                        onClick={this.handleAddTeacher}
                    >Add</Button>
                </Form>
            </div>
        )
    }

}

export default AddTeacher;