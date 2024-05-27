import {useState} from "react";
import {Link} from 'react-router-dom'
import {getAuth , sendPasswordResetEmail} from "firebase/auth";
import {toast} from "react-toastify";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword () {

 const [email, setEmail] = useState('')

    const onchange = e => {
    setEmail(e.target.value)
    }

    const onsubmit = async e =>{
     e.preventDefault()
        try{
         const auth = getAuth()
           await sendPasswordResetEmail(auth , email)
            toast.success('Email was send')

        }catch (error){
         toast.error('could not send reset')
        }



 }

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Forget Password</p>

            </header>
            <form onSubmit={onsubmit}>
                <input className='emailInput'
                       type="email"
                       placeholder='Email'
                       id='email'
                       value={email}
                       onChange={onchange} />

                <Link className='forgotPasswordLink' to='/sign-in'>Sign in</Link>
                <div className='signInBar'>
                    <div className='signInText'>Send Reset Link</div>
                    <button className='signInButton'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                    </button>
                </div>
            </form>

        </div>
    )


}



export default ForgotPassword


