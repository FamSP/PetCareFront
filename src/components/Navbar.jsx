import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const Navbar = () => {
    const { userInfo, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const username = userInfo?.username;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuItems = [];
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">

                    <a href="/" className="btn btn-ghost text-xl"
                    ><img src="https://cdn-icons-png.flaticon.com/512/3047/3047928.png"
                        alt="Logo"
                        className="w-8 h-8"
                        />PetCare Connect</a>
                </div>



                {username ? (
                    <div className="flex-none flex items-center gap-4">

                        {/* ปุ่ม Create Post */}
                        <a className="btn btn-ghost text-xl btn-outline btn-warning" href="/create">
                            Create Sitter Post
                        </a>

                        {/* ไอคอนกระดิ่ง */}
                        <div className="indicator">
                            <a href='job-requests'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item">0</span>
                            </a>
                        </div>

                        {/* รูปโปรไฟล์ */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>

                    </div>): (<div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost  items-center">
                            <div className="rounded-full">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                    alt="User Icon"
                                    className="w-8 h-8"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a href='login'>Login</a></li>
                            <li><a href='register'>Register</a></li>
                        </ul>
                    </div>
                </div>
                ) }
            </div>
        </div>
    )
}

export default Navbar
