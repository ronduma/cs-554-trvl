import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import spongebob from '../img/spongebob.jpg'

import '../App.css';
function PostForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const location = useLocation();
    const data = location.state;

    // const handleSubmit = (event) => {
    // console.log(data)


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/posts/${data.userData._id}`, formData);
        } catch (error) {
            console.error(error);
        }
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // handle form submission here
    // };

    const handleChangeTitle = (event) => {
        const name = event.target.value;
        setFormData({ title: name, content: formData.content });
    };
    const handleChangeContent = (event) => {
        const content = event.target.value;
        setFormData({ title: formData.title, content: content });
    };
    return (
        <div className="postform">

            <form onSubmit={handleSubmit}>
                <div className="titleLabel">
                    <label >
                        Title:
                        <input
                            value={formData.title}
                            onChange={handleChangeTitle}
                        />
                    </label>
                </div>
                <div className="contentLabel">
                    <label>
                        Content:
                        <input
                            value={formData.content}
                            onChange={handleChangeContent}
                        />
                    </label>
                </div>

                {/* <button onClick={() => {
                    axios.post(`/posts/${data.userData._id}`, formData)
                }} type="submit">Submit</button> */}
                <button type="submit">Submit</button>
            </form>
            <img src={spongebob} alt="Image description" className="form-image" />
        </div>
    );
}

export default PostForm;