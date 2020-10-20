import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { login, setError } from '../../actions/MediaActions';
import validator from 'validator';
import './loginPopup.css';

const LoginPopup = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const error = useSelector(state => state.media.error);
    const isLogin = useSelector(state => state.media.isLogin);

    useEffect(() => {
        if (isLogin) {
            closePopup();
        } else {
            openPopup();
        }
    }, [isLogin, error])

    const closePopup = () => {
        document.querySelector('#loginModal').style.display = 'none'
    }

    const openPopup = () => {
        document.querySelector('#loginModal').style.display = 'block'
    }

    const submit = async () => {
        let isValid = true;

        props.setError("");
        setEmailError("");
        setPasswordError("");

        if (!validator.isEmail(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        }

        if (!validator.isLength(password, { min: 6 })) {
            setPasswordError('Please enter at least 6 characters');
            isValid = false
        }

        if (isValid) {
            props.login(email, password);
        }
    }

    return (
        <div id="loginModal" className="modal">
            <form id="loginForm" className="modal-content animate" method="post">
                <div className="close-wrapper">
                    <span onClick={closePopup} className="close" title="Close Modal">&times;</span>
                </div>
                <div className="container">
                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={event => setEmail(event.target.value)} required />
                    <div className="error">{emailError}</div>
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={event => setPassword(event.target.value)} required />
                    <div className="error">{passwordError}</div>
                    <button type="button" onClick={submit}>Login</button>
                    <div className="error">{error}</div>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { login, setError })(LoginPopup);