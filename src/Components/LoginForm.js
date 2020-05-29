import React from 'react';
import './LoginForm.css';
import { Button } from 'antd';

const LoginForm = props => {

    //returns the login form if no user logged in
    //returns the logout form when logged in
    return (
        <div>
            <h4>Super log in here</h4>
            {props.user ?
                <Button onClick={props.logout}>Log out</Button>
                :
                <Button onClick={props.login}>Log in</Button>
            }
        </div>
    )
}

export default LoginForm;