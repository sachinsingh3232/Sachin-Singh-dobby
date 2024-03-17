import React from 'react'
import './Imageitem.css'
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ImageItem = ({ image }) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`${BASE_URL}/image/deleteImage/${image._id}`, { headers: { Authorization: JSON.parse(localStorage.getItem("token")) } })
      window.location.reload();
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className='imageItem'>
      <img src={image.url} alt=""></img>
      <div className='option'>
        <span className='name'>{image.name}</span>
        <span class="material-symbols-outlined delete" onClick={deleteHandler}>
          delete
        </span>
      </div>
    </div>
  )
}

export default ImageItem