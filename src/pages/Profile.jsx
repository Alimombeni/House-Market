import { useState , useEffect} from "react";
import { getAuth , updateProfile } from "firebase/auth";
import { updateDoc , doc } from 'firebase/firestore';
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom";

function Profile () {
    const auth = getAuth();
    const [changeDetails , setChangeDetails] =useState(false)
    const [formData , setFormData] = useState({
        name: auth.currentUser.displayName,
        email : auth.currentUser.email,
    })
    const {name , email} = formData
    const navigate = useNavigate()
const onSubmit = async () => {

        try {
            if (auth.currentUser.displayName !== name) {
                //update display name in fb
                await updateProfile(auth.currentUser , {
                    displayName : name,

                })
                //update in firestore
                const userRef= doc(db , 'users' , auth.currentUser.uid)
                await updateDoc(userRef , {
                    name ,

                })
            }

        }catch (error) {
        toast.error('Could not update profile details')
        }

}
const onLogout =() => {
        auth.signOut()
        navigate('/')
}
const onchange = (e) =>{
      setFormData((prevState) => ( {
          ...prevState,
          [e.target.id] : e.target.value
      }))
}

    return (
    <div className='profile'>
        <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
            <button className='logOut' type='button' onClick={onLogout}>Logout</button>
        </header>
        <main>
            <div className='profileDetailsHeader'>
                <p className='.profileDetailsText'>Personal Details</p>
                <p className='changePersonalDetails' onClick={()=> {
                    changeDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)
                }}>
                    {changeDetails ? 'done' : 'change'}
                </p>
            </div>

            <div className='profileCard'>
                <form>
                    <input
                        type="text"
                        id='name'
                        disabled={!changeDetails}
                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                        value={name}
                        onChange={onchange}
                    />

                    <input
                        type="text"
                        id='email'
                        disabled={!changeDetails}
                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                        value={email}
                        onChange={onchange}
                    />


                </form>
            </div>

        </main>
    </div>
    )

}


export default Profile