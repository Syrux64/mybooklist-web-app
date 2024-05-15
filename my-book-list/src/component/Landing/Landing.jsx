import { Navigate } from 'react-router-dom'
import styles from './Landing.module.css'
import bg from './landing_bg.jpg'



const Landing = () => {
    

    const handleSignUp = () =>{
        window.location = '/auth';
    }



    return(
        <>
        <div className={styles.image}>
            <img className={styles.backgroundImg} src={bg} />
                <div className={styles.welcome}>
                    <div>
                        <p className={styles.welcomeMessage}>Rate Your Reads :D</p>
                    </div>
                    <div>
                        <p className={styles.welcomeText}> Log your book reads with others and share your thoughts!!
                                                        Recommend, comment, share and rate the books you love
                            </p>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.buttonAuth} onClick={handleSignUp}>Join</button>
                    </div>
                    
                </div> 
        </div>
        </>
    )

}

export default Landing;