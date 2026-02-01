import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router'; // 1. เพิ่ม useParams, useNavigate
import Swal from 'sweetalert2';
import postService from '../services/post.service'; // 2. Import Service

const Edit = () => {
    const { id } = useParams(); // ดึง ID จาก URL
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [existingImage, setExistingImage] = useState(null); // เก็บ URL รูปเก่า

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

    // 3. โหลดข้อมูลเก่ามาใส่ฟอร์มเมื่อเข้าหน้านี้
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await postService.getById(id);
                const post = response.data;

                setName(post.title); // ใน DB เก็บเป็น title แต่ State เราใช้ name
                setService(post.service);
                setPrice(post.price);
                setContent(post.content);
                setExistingImage(post.cover); // เก็บรูปเก่าไว้โชว์
            } catch (error) {
                Swal.fire('Error', 'ไม่พบข้อมูลโพสต์', 'error');
                navigate('/');
            }
        };
        fetchPost();
    }, [id, navigate]);

    const updatePost = async (ev) => {
        ev.preventDefault();

        // Validation
        if (!name || !service || !price || !content) {
             Swal.fire({
                title: 'Error!',
                text: 'กรุณากรอกข้อมูลให้ครบ (รูปภาพจะใช้รูปเดิมหากไม่อัปโหลดใหม่)',
                icon: 'warning'
            });
            return;
        }

        const data = new FormData();
        data.set('name', name);
        data.set('service', service);
        data.set('price', price);
        data.set('content', content);
        
        // ถ้ามีการเลือกไฟล์ใหม่ ให้ส่งไปด้วย (ถ้าไม่เลือก Backend จะใช้รูปเดิม)
        if (files?.[0]) {
            data.set('file', files[0]);
        }

        try {
            // เรียกใช้ Service updatePost
            const response = await postService.updatePost(id, data);

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'แก้ไขข้อมูลสำเร็จ',
                    icon: 'success',
                }).then(() => {
                    navigate('/'); // กลับหน้าแรก
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'เกิดข้อผิดพลาดในการแก้ไข',
                icon: 'error',
            });
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl p-8 mx-auto mt-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Post</h1>

                <form onSubmit={updatePost} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full bg-white"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                    </div>

                    {/* Service */}
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

                    {/* Price */}
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

                    {/* Image Upload & Preview */}
                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Your picture image</span>
                        </label>
                        
                        {/* แสดงรูปเก่าถ้ามี */}
                        {existingImage && !files && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                                <img 
                                    src={existingImage.startsWith('http') ? existingImage : `${import.meta.env.VITE_BASE_URL}/${existingImage}`} 
                                    alt="Current" 
                                    className="h-32 w-auto rounded-lg border object-cover"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full bg-white"
                            onChange={ev => setFiles(ev.target.files)}
                        />
                        <span className="text-xs text-gray-500">Leave blank to keep current image</span>
                    </div>

                    {/* Content Editor */}
                    <div>
                        <label className="label">
                            <span className="label-text font-bold text-base">Create your Profile</span>
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

                    <button className="btn btn-primary w-full text-white text-lg mt-6 bg-[#4f46e5] hover:bg-[#4338ca] border-none">
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;