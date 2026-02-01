import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthenticationService from "../services/authentication.service";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    
    const { logIn, userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช

        if (!user.username || !user.password) {
            Swal.fire({
                title: "Error",
                text: "กรุณากรอก username และ password ให้ครบ",
                icon: "error",
            });
            return;
        }

        try {
            const response = await AuthenticationService.login(
                user.username,
                user.password
            );

            Swal.fire({
                title: "Success",
                text: "เข้าสู่ระบบสำเร็จ", // แก้ข้อความให้ถูกต้อง
                icon: "success",
            }).then(() => {
                // บันทึกข้อมูลลง Context
                logIn({
                    id: response.data.id, // หรือ response.data.user.id เช็คดูโครงสร้าง API อีกทีนะครับ
                    username: response.data.username,
                    accessToken: response.data.accessToken,
                });
                navigate("/");
            });
        } catch (error) {
            Swal.fire({
                title: "Login ไม่สำเร็จ",
                text: error.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                icon: "error",
            });
        }
    };

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100 -mt-24">
            <div className="card-body">

                <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">
                    Login
                </h2>
                <form>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        {/* แก้ไข Input: เพิ่ม value, onChange, type=text, input-bordered */}
                        <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered" 
                            name='username'
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        {/* แก้ไข Input: เพิ่ม value, onChange, input-bordered */}
                        <input 
                            type="password" 
                            placeholder="************" 
                            className="input input-bordered" 
                            required 
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <div className="text-center mt-4">
                    <span className="text-gray-500 text-sm">Don't have account? </span>
                    <a href="register" className="link link-primary font-bold text-sm">
                        Register
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Login