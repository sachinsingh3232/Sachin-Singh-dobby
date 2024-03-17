import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import profile from '../../profile.png'
import axios from 'axios'
import { AuthContext } from '../../Context/authContext'
import Modal from '../Modal/Modal'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Navbar = ({ user, setData }) => {
    const [search, setSearch] = useState('');
    const { logOut } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fn = async () => {
            const data = await axios.post(`${BASE_URL}/image/getImages`, { search }, { headers: { Authorization: JSON.parse(localStorage.getItem("token")) } });
            // console.log(data.data)
            setData(data.data);
        }
        fn();

    }, [search])


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='navbar'>
            <div className='logo'>Gallery</div>
            <input className='search' type='search' placeholder='Search image' onChange={(e) => setSearch(e.target.value)} />
            <div>
                <button className='add' onClick={openModal}>+</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <img className='profile' src={profile} alt="" title={user?.email ? user.email : "username"} onClick={logOut} />
        </div>
    )
}

export default Navbar