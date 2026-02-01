import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import BookingService from "../services/booking.service"; // (ถ้ามี API แล้วให้เปิดใช้)

const JobRequests = () => {
  // Mock Data (จำลองข้อมูลที่ได้จาก Database)
  // ในการใช้งานจริง ข้อมูลตรงนี้จะมาจาก API ที่ดึง Booking ที่ status = 'pending'
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "คุณสมชาย ใจดี",
      customerPhone: "081-234-5678",
      serviceType: "ฝากเลี้ยงค้างคืน (Boarding)",
      date: "2026-02-02",
      price: 350,
      status: "pending", // pending, accepted, rejected
    },
    {
      id: 2,
      customerName: "น้องพลอย รักแมว",
      customerPhone: "099-888-7777",
      serviceType: "พาเดินเล่น (Walk the Pet)",
      date: "2026-02-03",
      price: 150,
      status: "pending",
    },
  ]);

  // ฟังก์ชันกดรับงาน
  const handleAccept = (id) => {
    Swal.fire({
      title: "ยืนยันการรับงาน?",
      text: "คุณต้องการรับงานนี้ใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // สีน้ำเงินตามรูป
      cancelButtonColor: "#d33",
      confirmButtonText: "รับงานนี้",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: ยิง API ไป update status เป็น 'accepted'
        // await BookingService.acceptBooking(id);

        setRequests((prev) =>
          prev.filter((req) => req.id !== id) // ลบออกจากรายการรอ
        );
        Swal.fire("เรียบร้อย!", "คุณได้รับงานนี้แล้ว", "success");
      }
    });
  };

  // ฟังก์ชันปฏิเสธงาน
  const handleReject = (id) => {
    Swal.fire({
      title: "ปฏิเสธงาน?",
      text: "คุณแน่ใจหรือไม่ที่จะปฏิเสธคำขอนี้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "ใช่, ปฏิเสธ",
      cancelButtonText: "กลับ",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: ยิง API ไป update status เป็น 'rejected'
        setRequests((prev) => prev.filter((req) => req.id !== id));
        Swal.fire("ปฏิเสธแล้ว", "คำขอถูกปฏิเสธ", "info");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🔔 คำขอจองล่าสุด (Job Requests)
        </h1>

        {requests.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            ไม่มีคำขอจองใหม่ในขณะนี้
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="card bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="card-body p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  {/* --- ฝั่งซ้าย: ข้อมูลลูกค้า (ไม่มีรูป) --- */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-gray-800">
                        {req.customerName}
                      </h2>
                      {/* Badge สถานะ */}
                      <span className="badge badge-warning badge-sm text-xs">
                        รอการตอบรับ
                      </span>
                    </div>

                    {/* เบอร์โทร */}
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      📞 {req.customerPhone}
                    </p>

                    {/* ประเภทบริการ & วันที่ */}
                    <div className="mt-2 text-primary font-medium">
                      {req.serviceType}
                    </div>
                    <div className="text-gray-400 text-sm flex items-center gap-1">
                      🕒 {req.date}
                    </div>
                  </div>

                  {/* --- ฝั่งขวา: ราคา & ปุ่ม Action --- */}
                  <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <div className="text-xl font-bold text-gray-900">
                      ฿{req.price}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleReject(req.id)}
                        className="btn btn-ghost text-gray-500 hover:bg-gray-100 btn-sm"
                      >
                        ปฏิเสธ
                      </button>
                      
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none text-white btn-sm px-6"
                      >
                        รับงานนี้
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRequests;