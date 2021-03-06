import React from 'react';
import './Adding.css';
import { Input, Button, Form } from 'antd';
import firebase from '../firebase.js';

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newClass: '',
        }
    }

    //handles the input and assigns to state
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //adds a class to firebase
    handleAddClass = (e) => {
        e.preventDefault();
        const classRef = firebase.database().ref('classes')
        const course = { className: this.state.newClass }
        classRef.push(course);
        this.setState({ newClass: '' })
    }

    render() {
        return (
            <div className='AddClass'>
                <b>Add New Class</b>
                <Form id='form'>
                    <Form.Item>
                        <Input
                            name='newClass'
                            placeholder='new class'
                            value={this.state.newClass}
                            onChange={this.handleInput}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='submit'
                            onClick={this.handleAddClass}
                        >Add</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AddClass