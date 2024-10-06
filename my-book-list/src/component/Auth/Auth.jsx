import bg from '../Landing/landing_bg.jpg'
import styles from './Auth.module.css'
import stylesLanding from '../Landing/Landing.module.css'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';
import { useState } from 'react';

import '../../../../Backend/Database/supabaseClient'

const Auth = ({user}) => {
    if(user) window.location='/home';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    const handleSignUp = () => {
        const userNameLowerCase = userName.toLowerCase();

        fetch('/db/submit/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName:userNameLowerCase, email})
        })
        .then(response => {
            if (response.ok) {
                return createUserWithEmailAndPassword(auth, email, password);
            } else {
                if(response.status == 409)
                    alert("Username Already Exists");
                if(response.status == 408)
                    alert("Email Already Exists");
                throw new Error('Email check failed');
            }
        })
        .then((userCredential) => {
            
        })
        .catch((error) => {
            if(error.code === 'auth/weak-password'){
                alert("Weak Password")
            }
        });
    };
    

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location = '/home';
            })
            .catch((error) => {
                alert("Invalid Email/Password");
            });
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUserName(usernameValue);
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignUpActive) {
            handleSignUp();
        } else {
            handleSignIn();
        }
    };


    return (
        <>
        <div className={stylesLanding.image}>
            <img className={stylesLanding.backgroundImg} src={bg} />
                <div className={stylesLanding.welcome}>
                    <form onSubmit={handleSubmit}>
                        {isSignUpActive ? <p className={stylesLanding.welcomeMessage}>Sign Up</p> : <p className={stylesLanding.welcomeMessage}>Log In</p>}
                        {isSignUpActive? 
                            <>
                            <div className={styles.prompt}>
                                <input type="text" id="username" value={userName} placeholder='Username' 
                                onChange={handleUsernameChange} required />

                            </div>
                            </> : null
                        }
                        <div className={styles.prompt}>
                                <input type="email" id="email" value={email} 
                                    placeholder='Email'
                                onChange={handleEmailChange} required />
                        </div>
                        <div className={styles.prompt}>
                            <input type="password" id="password" value={password} 
                                    placeholder='Password'
                                    onChange={handlePasswordChange} required />
                        </div>
                        <div className={stylesLanding.buttons}>
                        <button type="submit" >{isSignUpActive ? "Sign Up" : "Log In"}</button>
                        </div>
                        
                    </form>
                    <a onClick={handleMethodChange}>{isSignUpActive ? "Log In" : "Sign Up"}</a>
                </div> 
        </div>
        </>
        
    );
};

export default Auth;
