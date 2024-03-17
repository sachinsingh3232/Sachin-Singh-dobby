import React, { useContext, useEffect, useState } from 'react'
import ImageItem from '../../components/ImageItem/ImageItem'
import './Home.css'
import image from '../../image.jpg'
import image2 from '../../image2.png'
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../Context/authContext'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (!currentUser || !JSON.parse(localStorage.getItem("token"))) navigate('/login');
    }, [])
    return (
        <div className='home'>
            <Navbar user={currentUser} setData={setData} />
            {data.length > 0 ? <div className='imageList'>
                {data.length > 0 ? data.map((image) => (
                    <ImageItem image={image} key={image._id} />
                )) : <div></div>}
            </div> : <div></div>}
        </div>
    )
}

export default Home