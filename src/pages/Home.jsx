import { useState, useEffect } from "react";
// import { Link } from "react-router"; // ไม่ได้ใช้ Link ลบออกได้ครับ
import postService from "../services/post.service.js";
import Post from "../components/Post.jsx";
import Swal from "sweetalert2";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const response = await postService.getAllPost();
                if (response.status === 200) {
                    setPosts(response.data);
                }
            } catch (error) {
                Swal.fire({
                    title: "Home",
                    text: error.response?.data?.message || error.message,
                    icon: "error",
                });
            }
        };
        getAllPost();
    }, []);

    // ✅ 1. สร้างฟังก์ชันสำหรับกรองข้อมูลตาม Service
    const getPostsByService = (serviceName) => {
        // กรองเอาเฉพาะ post ที่ service ตรงกับที่ส่งมา
        return posts.filter(post => post.service === serviceName);
    };

    return (
        <div className="pb-20">
            {/* --- Section 1: Walk the Pet --- */}
            <div className='text-center my-4 text-2xl font-bold divider p-10'>Walk the Pet</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto'>
                {/* เรียกใช้ฟังก์ชันกรองข้อมูล */}
                {getPostsByService("Walk the Pet").length > 0 ? (
                    getPostsByService("Walk the Pet").map((post) => (
                        <Post key={post._id} postDetail={post} />
                    ))
                ) : (
                    <div className="text-gray-400 col-span-3">No posts available</div>
                )}
            </div>

            {/* --- Section 2: Pet Grooming --- */}
            <div className='text-center my-4 text-2xl font-bold divider p-10'>Pet Grooming</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto'>
                {getPostsByService("Pet Grooming").length > 0 ? (
                    getPostsByService("Pet Grooming").map((post) => (
                        <Post key={post._id} postDetail={post} />
                    ))
                ) : (
                    <div className="text-gray-400 col-span-3">No posts available</div>
                )}
            </div>

            {/* --- Section 3: Pet Sitting --- */}
            <div className='text-center my-4 text-2xl font-bold divider p-10'>Pet Sitting</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto'>
                {getPostsByService("Pet Sitting").length > 0 ? (
                    getPostsByService("Pet Sitting").map((post) => (
                        <Post key={post._id} postDetail={post} />
                    ))
                ) : (
                    <div className="text-gray-400 col-span-3">No posts available</div>
                )}
            </div>

            {/* --- Section 4: Pet Training --- */}
            <div className='text-center my-4 text-2xl font-bold divider p-10'>Pet Training</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto'>
                {getPostsByService("Pet Training").length > 0 ? (
                    getPostsByService("Pet Training").map((post) => (
                        <Post key={post._id} postDetail={post} />
                    ))
                ) : (
                    <div className="text-gray-400 col-span-3">No posts available</div>
                )}
            </div>
        </div>
    )
}

export default Home