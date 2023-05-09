import React, { useState } from 'react';

function PostForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    const handleChangeTitle = (event) => {
        const name = event.target.value;
        setFormData({ title: name, content: formData.content });
        console.log(formData);
    };
    const handleChangeContent = (event) => {
        const content = event.target.value;
        setFormData({ title: formData.title, content: content });
        console.log(formData);
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;