import { Link } from "react-router-dom";
import app from "../../firebase/firebase.config";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";


const auth = getAuth(app);

const Login = () => {
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('');
    const resetEmail=useRef('');
    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });
        setLogin('');
        setLoginError('')
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const userLogin = userCredential.user;
                setLogin('Login Successfull');
            }).catch(error => {
                setLoginError(error.message);

            })
    }
    const passwordReset = () => {
        const email=resetEmail.current.value;
        if(!email){
            alert('Please enter your email');
        }
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('check your email');
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div style={{ textAlign: "center" }}>
            <h2>This is register page</h2>
            {/* {Way number 3: use onSubmit event handler} */}
            <form onSubmit={handleLogin}>
                <input type="email" name="email" id="email" placeholder="Your Email" ref={resetEmail} required /> <br />
                <input type="password" name="password" id="password" placeholder="Your password" required /> <br />
                <input type="submit" value="Login" />
                <p>{login}</p>
                <p>{loginError}</p>
            </form>
            <p>You forget your password? <button onClick={passwordReset}>Click here</button></p>
            <p>If you have not an any account. Please <Link to='/register'>register</Link> </p>
        </div>
    );
};
// onSubmit={handleSubmitForm}
// onChange={handleEmailChange}
// onBlur={handlePasswordChange}
export default Login;