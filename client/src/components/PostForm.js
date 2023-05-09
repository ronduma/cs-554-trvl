import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

function PostForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const location = useLocation();

    const data = location.state;
    console.log(data)
    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    const handleChangeTitle = (event) => {
        const name = event.target.value;
        setFormData({ title: name, content: formData.content });
    };
    const handleChangeContent = (event) => {
        const content = event.target.value;
        setFormData({ title: formData.title, content: content });
    };
    console.log(formData);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        value={formData.title}
                        onChange={handleChangeTitle}
                    />
                </label>
                <label>
                    Content:
                    <input
                        value={formData.content}
                        onChange={handleChangeContent}
                    />
                </label>
                <button onClick={() => {
                    axios.post(`/posts/${data.userData._id}`, formData)
                }} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;