import React, { useState } from 'react';
import { useHistory } from 'react-router';
import loginimg from './loginimg.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Loginpage = () => {
    const history = useHistory();
    const [val, updateval] = useState({ email: "", password: "" });
    const [signupDetails, setSignupDetails] = useState({ signupemail: '', signuppassword: '', signupcpassword: '' });
    const [valid, updatevalid] = useState()
    const [login, setlogin] = useState(true);
    const submitHandler = (e) => {
        e.preventDefault();
        setlogin(true);

        if (val.email !== '' && val.password !== '' && val.email == signupDetails.signupemail && val.password == signupDetails.signuppassword) {
            history.push('/contact')
        }
        else {
            gettoast("Inavlid Details");
        }
    }

    function gettoast(msg) {
        toast.error(msg, {
            position: "top-right"
        });
    }
    const signupHandler = () => {
        if (signupDetails && signupDetails.signuppassword !== signupDetails.signupcpassword) {
            gettoast("password should match");
            setlogin(false)
            console.log("if block")
        }
        else if (signupDetails.signupcpassword !== '' && signupDetails.signuppassword !== '' && signupDetails.signuppassword == signupDetails.signupcpassword) {
            setlogin(true);
            console.log("else if")
        }
        else {
            setlogin(false)
            console.log("elsse")
        }
    }

    const updatesignupdetails = (e) => {
        const { name, value } = e.target;
        setSignupDetails({ ...signupDetails, [name]: value })
    }

    const updatedetails = (e) => {
        const { name, value } = e.target;
        updateval({ ...val, [name]: value })
    }

    return (
        <div className="formpage">
            <div className="formimg">
                <img src={loginimg} className="loginimg"></img>
            </div>

            <div className="loginform">
                {login ? <div>

                    <div className="tagline"> Login to get connected</div>
                    <div className="forminputs" ><input type="text" value={val.email} onChange={updatedetails} name="email" className="formfield" placeholder="Enter your email"></input></div>
                    <div className="forminputs" ><input type="password" value={val.password} onChange={updatedetails} name="password" className="formfield" placeholder="Enter your password"></input></div>
                </div> :
                    <div>
                        <div className="tagline">Signup to get connected</div>
                        <div className="forminputs" ><input type="text" value={signupDetails.signupemail} onChange={updatesignupdetails} name="signupemail" className="formfield" placeholder="Enter your email"></input></div>
                        <div className="forminputs" ><input type="password" value={signupDetails.signuppassword} onChange={updatesignupdetails} name="signuppassword" className="formfield" placeholder="Enter your password"></input></div>
                        <div className="forminputs" ><input type="password" value={signupDetails.signupcpassword} onChange={updatesignupdetails} name="signupcpassword" className="formfield" placeholder="Confirm password "></input></div>

                    </div>
                }
                <div className='loginbtns'>
                    <div className="login_btn" onClick={submitHandler}>login</div>
                    <div className="login_btn" onClick={signupHandler}>signup</div></div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Loginpage
