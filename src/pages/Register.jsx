import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import AuthenticationService from "../services/authentication.service"; 

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

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
        e.preventDefault()

        // 1. เช็คว่ากรอกครบไหม (ย้ายมาเช็คก่อน)
        if (!user.username || !user.phone || !user.password || !user.confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Please fill all fields!",
                icon: "error",
            });
            return; // **สำคัญ: ต้องใส่ return เพื่อหยุดการทำงานทันที
        }

        // 2. เช็ค Password ไม่ตรงกัน
        if (user.password !== user.confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Password does not match!",
                icon: "error",
            });
            return; // **สำคัญ: ต้องใส่ return ไม่งั้นมันจะไปยิง API ต่อ
        }

        try {
            // 3. ยิง API
            const response = await AuthenticationService.register(
                user.username,
                user.phone,
                user.password
            );

            // 4. ถ้าสำเร็จ (Status 200 หรือ 201)
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "Success",
                    text: response?.data?.message || "Register Successfully",
                    icon: "success",
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            // 5. แก้ไขการดึง Error Message ให้ถูกต้อง
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
            
            Swal.fire({
                title: "สมัครสมาชิกไม่สำเร็จ",
                text: errorMessage,
                icon: "error",
            });
        }
    }

    return (
        <div className="card w-full max-w-md shadow-2xl bg-base-100 -mt-24">
            <div className="card-body">

                <h2 className="card-title text-2xl font-bold text-center justify-center mb-4">
                    Register
                </h2>
                <form>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered" name="username" onChange={handleChange}
                            value={user.username} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" placeholder="Your phone number" className="input input-bordered" name="phone" onChange={handleChange}
                            value={user.phone} />
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="************" className="input input-bordered" name="password" onChange={handleChange}
                            value={user.password} required />

                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="************" className="input input-bordered" name='confirmPassword' onChange={handleChange}
                            value={user.confirmPassword} required />
                    </div>

                    <div className="form-control mt-6">
                        {/* เปลี่ยนจาก form onSubmit เป็น onClick ที่ปุ่ม (หรือจะใช้ onSubmit ที่ form ก็ได้แต่ต้องเลือกอย่างใดอย่างหนึ่ง) */}
                        <button className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
                    </div>
                </form>
                <div className="divider">OR</div>
                <div className="text-center mt-4">
                    <span className="text-gray-500 text-sm">Already have an account? </span>
                    <a href="login" className="link link-primary font-bold text-sm">
                        Login
                    </a>
                </div>
            </div>
        </div>

    )
}

export default Register