import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

// 2. Import Service แทนการใช้ axios ตรงๆ
import PostService from '../services/post.service'; 

const Create = () => {
    const [Name, setName] = useState('');
    const [files, setFiles] = useState(null);
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    
    const { userInfo } = useContext(UserContext); 
    const navigate = useNavigate(); // 3. สร้างตัวแปร navigate

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ]
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!Name || !service || !price || !content || !files?.[0]) {
             Swal.fire({
                title: 'Error!',
                text: 'กรุณากรอกข้อมูลให้ครบทุกช่องและอัปโหลดรูปภาพ',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        const data = new FormData();
        data.set('name', Name);       
        data.set('service', service); 
        data.set('price', price);    
        data.set('content', content); 
        data.set('file', files[0]);   

        try {
           
            const response = await PostService.createPost(data);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'สร้างโพสต์โปรไฟล์สำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/'); 
                   
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'เกิดข้อผิดพลาดในการสร้างโพสต์',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    if (!userInfo) {
         return  navigate("/login")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl p-8 mx-auto mt-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Sitter Profile</h1>

                <form className="space-y-6">

                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Name (ชื่อพี่เลี้ยง)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full bg-white"
                            value={Name}
                            onChange={ev => setName(ev.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Your picture image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full bg-white"
                            onChange={ev => setFiles(ev.target.files)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Your service</span>
                        </label>
                        <select
                            className="select select-bordered w-full text-base bg-white"
                            value={service}
                            onChange={ev => setService(ev.target.value)}
                        >
                            <option value="" disabled>Pick your service</option>
                            <option value="Walk the Pet">Walk the Pet</option>
                            <option value="Pet Grooming">Pet Grooming</option>
                            <option value="Pet Sitting">Pet Sitting</option>
                            <option value="Pet Training">Pet Training</option>
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Price (THB)</span>
                        </label>
                        <input
                            type="number" 
                            placeholder="Example: 500"
                            className="input input-bordered w-full bg-white"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">About yourself & Service details</span>
                        </label>
                        <div className="h-64 mb-12 sm:mb-8">
                            <ReactQuill
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                theme="snow"
                                className="h-full"
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary w-full text-white text-lg mt-6 bg-[#4f46e5] hover:bg-[#4338ca] border-none" onClick={handleSubmit}>
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;