import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-gray-300 to-gray-200">
      <header >
        <Navbar />
      </header>
      <main className="grow flex items-center justify-center mx-auto pt-5 mt-5 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
