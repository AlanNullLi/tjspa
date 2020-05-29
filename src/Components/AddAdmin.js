import React from 'react';
import firebase, { auth, provider } from '../firebase.js';
import { Button } from 'antd';

class AddAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAdmin: null
        }
    }

    //add a username input and use that as the admin list
    //keep this for login but the username has to be unique
    handleAddAdmin = () => {
        const adminRef = firebase.database().ref('admins');
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user
                this.setState({
                    newAdmin: { adminID: user }
                })
            })
        //console is returning null
        adminRef.push(this.state.newAdmin)
        console.log(this.state.newAdmin)
        this.setState({
            newAdmin: null
        })
    }

    render() {

        return (
            <div>
                <Button
                    type='submit'
                    onClick={this.handleAddAdmin}
                >Add New Admin</Button>
            </div>
        )
    }
}

export default AddAdmin;