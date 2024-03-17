import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './modal.css'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Modal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: isOpen ? 'block' : 'none',
    
    };

    const modalContentStyle = {
        backgroundColor: '#fff',
        margin: 'auto',
        padding: '20px',
        width: '350px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '20vh',
        borderRadius: "5px"
    };
    const formStyle = {
        width: '300px',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-around'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("please wait")
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Blog_App");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/ddv2p9obt/image/upload",
                data
            );
            const { url } = uploadRes.data;
            const value = {
                name, url
            };

            await axios.post(`${BASE_URL}/image/addImage`, value,{headers:{Authorization:JSON.parse(localStorage.getItem("token"))}});
            window.location.reload();
        } catch (error) {
            alert('Error sending data');
        }
        onClose();
    };

    return (
        <div style={modalStyle} >
            <div style={modalContentStyle} className='bg'>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='ImageName' required={true} />
                    <input type='file' name='' id='file' onChange={(e) => setFile(e.target.files[0])} required={true} />
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
