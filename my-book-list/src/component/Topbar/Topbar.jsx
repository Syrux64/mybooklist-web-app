
import styles from './Topbar.module.css';
import { useState, useEffect } from "react";

import MyBookListImage from './MyBookList.png';
import ListImage from './list.png';
import LogOutImage from './logout.svg';

import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';


const Topbar = ({user}) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user?.email) {
            fetch('/db/get/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        console.log('Received:', text);
                        throw new Error('Error retrieving username');
                    });
                }
            })
            .then(data => {
                setUserName(data.userName);
            })
            .catch(error => {
                
                console.error('Error retrieving username:', error);
            });
        }
    }, [user?.email]);
    



    const goHome = () => {
        window.location = "/home";
    }

    const [searchBookQuery, setSearchBook] = useState('');

    const handleChange = (event) =>{
        setSearchBook(event.target.value);
    }
    const searchBook = () =>{
        window.location = `/search/${searchBookQuery}`;
        console.log(searchBookQuery);
    }

    const handleSignOut = () =>{
            signOut(auth).then(()=>{
                window.location = '/';
                console.log("Signned Out")
            }).catch((error)=>console.log(error));
    }

    return(
        <>
        <div className={styles.topBar}>
            <div className={styles.topBarSite}>
                <img src={MyBookListImage} id="goHome" alt="My Book List" onClick={goHome}/>
            </div>
            <div className={styles.profileBar}>
                <div className={styles.searchBar}>
                    <input type="text" value={searchBookQuery} onChange={handleChange} placeholder="search"/>
                    <button id="searchButton" onClick={searchBook}></button>
                </div>
                <img src={LogOutImage} alt="LogOut" onClick={handleSignOut}/>
                {/* <img src={ListImage} alt="ListImage"/> */}
                <div className={styles.userName}>
                    <p>{userName}</p>
                </div>
            </div>
        </div>
        <div>
            <nav className={styles.navBar}>
                <div className={styles.navDiv}> 
                    <ul>
                        <li><a href="/home">Books</a></li>
                        <li><a href="/community">Community</a></li>
                        {/* <li><a href="#">Industry</a></li> */}
                    </ul>
                </div>
            </nav>
        </div>
        
        </>
    );
}

export default Topbar;