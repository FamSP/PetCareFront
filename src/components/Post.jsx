import React, { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import postService from '../services/post.service';

const Post = ({ postDetail }) => {
    if (!postDetail) {
        return null; 
    }

    const { userInfo } = useContext(UserContext);

    const stripHtml = (html) => {
        if (!html) return "";
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    const authorId = postDetail?.author?._id || postDetail?.author;

    const isOwner = userInfo && userInfo.id === authorId;

    const handleDelete = async () => {
        if (!isOwner) return;

        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณจะไม่สามารถกู้คืนโพสต์นี้ได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // เรียก Service เพื่อลบ
                    const response = await postService.deletePost(postDetail._id);
                    
                    if (response.status === 200 || response.status === 204) {
                        Swal.fire(
                            'ลบสำเร็จ!',
                            'โพสต์ของคุณถูกลบเรียบร้อยแล้ว',
                            'success'
                        ).then(() => {
                            window.location.reload(); 
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'เกิดข้อผิดพลาด!',
                        error.response?.data?.message || 'ไม่สามารถลบโพสต์ได้',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div className="indicator">
            {isOwner && (
                <span 
                    className="indicator-item badge badge-secondary cursor-pointer h-8 w-8 font-bold flex items-center justify-center hover:bg-red-600 transition-colors"
                    onClick={handleDelete}
                    title="Delete this post"
                >
                    X
                </span>
            )}

            <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <figure className="px-10 pt-10 h-64">
                    <img
                        src={postDetail?.cover 
                            ? (postDetail.cover.startsWith('http') 
                                ? postDetail.cover 
                                : `${import.meta.env.VITE_BASE_URL}/${postDetail.cover}`)
                            : "https://placehold.co/400"
                        }
                        alt={postDetail?.title || "Post Image"}
                        className="rounded-xl h-full w-full object-cover" 
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-xl font-bold">
                        {postDetail?.title}
                    </h2>
                    
                    <div className="badge badge-accent badge-outline mb-2">
                        {postDetail?.price ? `${postDetail.price} THB` : 'Price N/A'}
                    </div>

                
                    
                    <div className="card-actions w-full justify-between mt-4">
                        <Link to={`/pet-sitter/${postDetail?._id}`} className="btn btn-primary btn-sm">
                            Sitter Detail
                        </Link>
                        
                        <button className="btn btn-success btn-sm text-white">
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;