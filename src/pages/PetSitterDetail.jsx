import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import { UserContext } from "../context/UserContext";

const PetSitterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "ไม่พบข้อมูลพี่เลี้ยง หรือเกิดข้อผิดพลาด",
          icon: "error",
        }).then(() => {
          navigate("/");
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id, navigate]);

  const handleReserve = () => {
    if (!userInfo) {
      Swal.fire("กรุณาเข้าสู่ระบบ", "คุณต้องเข้าสู่ระบบก่อนทำการจอง", "warning");
      return;
    }
    Swal.fire("Success", `จองบริการกับ ${post.title} เรียบร้อยแล้ว!`, "success");
  };

  const isOwner = userInfo?.id === (post?.author?._id || post?.author);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (!post) return null;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      {/* จำกัดความกว้างคอนเทนเนอร์ให้อ่านง่าย (max-w-3xl) */}
      <div className="max-w-3xl mx-auto">
        
        {/* ปุ่มย้อนกลับ */}
        <Link to="/" className="btn btn-ghost mb-4 no-animation">
          ← Back to Home
        </Link>

        {/* ✅ เอา lg:card-side ออก เพื่อให้เป็นแนวตั้งเสมอ 
            ✅ ปรับรูปให้เป็น w-full และสูงพอประมาณ (h-64 ถึง h-96)
        */}
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          
          {/* --- ส่วนรูปภาพ (อยู่ด้านบน) --- */}
          <figure className="w-full h-80 sm:h-96 bg-gray-100">
            <img
              src={
                post.cover
                  ? post.cover.startsWith("http")
                    ? post.cover
                    : `${import.meta.env.VITE_BASE_URL}/${post.cover}`
                  : "https://placehold.co/800x400"
              }
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </figure>

          {/* --- ส่วนข้อมูล (อยู่ด้านล่าง) --- */}
          <div className="card-body p-6 sm:p-10">
            
            {/* Header: Service Badge & Title */}
            <div className="text-center mb-6">
              <div className="badge badge-primary badge-lg mb-4 text-white">
                {post.service}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                {post.title}
              </h1>
            </div>

            {/* Price Info */}
            <div className="flex justify-center items-center gap-2 mb-8 bg-base-200 p-4 rounded-xl">
               <span className="text-gray-500 font-medium">ราคาเริ่มต้น:</span>
               <span className="text-3xl font-bold text-primary">{post.price}</span>
               <span className="text-gray-500">THB</span>
            </div>

            <div className="divider text-gray-400">รายละเอียดบริการ</div>

            {/* Content Detail */}
            <div 
              className="prose max-w-none mb-10 text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              {isOwner && (
                <Link to={`/edit/${post._id}`} className="btn btn-warning btn-outline w-full sm:w-auto px-8">
                  แก้ไขข้อมูล (Edit)
                </Link>
              )}

              <button 
                onClick={handleReserve}
                className="btn btn-primary text-white w-full sm:w-auto px-12 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                จองเลย (Reserve Now)
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PetSitterDetail;