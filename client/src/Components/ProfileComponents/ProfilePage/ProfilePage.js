import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../profile.service'
import './profile-page.css'
const ProfilePage = () => {
    let navigate = useNavigate()
    let myPetsButtonHandle = () => {
        navigate('/pets-catalog')
    }







    let [userInfo, setInfo] = useState({

        'username': '',
        'userEmail': '',
        'password': '',
        'rePassword': '',
        'gender': '',
        'location': '',
    })


    useEffect(() => {




        getUserInfo()
            .then(
                info => {
                    setInfo(info)
                }
            )

    }, [])

    if (userInfo.pets == undefined) {
        return (<div className='loader-wraper'>
            <div className='loader'></div>
        </div>)
    }

    let displayedPets;

    if (userInfo?.pets.length > 0) {
        displayedPets = userInfo.pets.slice(0, 3)
        console.log(displayedPets)
    } else {
        displayedPets = 'You don`t have pet yet!'
    }
    console.log(userInfo?.pets.length)

    return (

        <div className='user-profile-heading'>

            <h2>User Profile</h2>

            <div className="cards-container">
                <div className="card card-one">
                    <header>{
                        userInfo.gender === 'male' ? <div className="avatar">
                            <img className='profile-img-class' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2HoveSx5prCIWhGymQ6z5-G-F3rejFBbVuA&usqp=CAU" alt="user-image-male" />
                        </div> : <div className="avatar">
                            <img className='profile-img-class' src="https://cdn-icons-png.flaticon.com/512/146/146025.png" alt="user-img-female" />
                        </div>
                    }


                    </header>

                    <h3>{userInfo?.username[0]?.toUpperCase() + userInfo.username?.slice(1)}</h3>
                    <div className='user-info'>
                        <div>
                            <i className='fas fa-dog'></i>

                            <span>&nbsp;{displayedPets.map((x, i) => <span key={i + x.petName}> {x.petName} </span>)}
                            </span>
                        </div>

                        <div>
                            <i className='fas fa-mobile'></i>
                            <span>&nbsp;&nbsp;+88888888</span>
                        </div>

                        <div>
                            <i className='fas fa-location'></i>
                            <span>&nbsp;&nbsp;{userInfo?.location[0]?.toUpperCase() + userInfo.location?.slice(1)}</span>
                        </div>
                        <div>
                            <i className='fas fa-envelope'></i>
                            <span>&nbsp;&nbsp;{userInfo.userEmail}</span>
                        </div>

                    </div>
                    <footer>
                        <button onClick={myPetsButtonHandle} className='my-pets-button'>My pets</button>
                    </footer>
                </div>


            </div>
        </div>

    )

}

export default ProfilePage