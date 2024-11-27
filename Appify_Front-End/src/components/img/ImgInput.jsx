import React, { useState } from 'react';
import {  MdImage } from 'react-icons/md';

export const ImgInput = ({ setImgLink }) => {
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        setLoading(true);
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const label = document.querySelector('.labelImgInput');
                label.style.backgroundImage = `url(${e.target.result})`;
                label.innerHTML = '';
                label.style.backgroundSize = 'container';
                label.style.backgroundPosition = 'center';
                setImgLink(e.target.result); 
                setLoading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
           <label htmlFor="imageInput" className="labelImgInput">
                <MdImage/>
                <p>Agregar imagen</p>
            </label>
            <input type="file" id="imageInput" accept="image/*" name="img" onChange={handleImageChange} style={{ display: 'none' }}/>
            {loading && <p>Cargando...</p>}
        </>
    );
};
