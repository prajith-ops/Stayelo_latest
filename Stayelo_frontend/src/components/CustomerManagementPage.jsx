import React, { useState, useEffect, useMemo } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { MdBlock, MdOutlineDelete } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import axios from "axios";

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const rowsPerPage = 4;

  // 🔹 Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/auth/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // 🔍 Filter customers by email only
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, customers]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + rowsPerPage);

  // 🚦 Block / Unblock Customer
  const handleBlockToggle = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const updatedStatus = status === "Active" ? "Inactive" : "Active";

      await axios.put(
        `http://localhost:4000/api/auth/customers/${id}`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCustomers((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: updatedStatus } : c))
      );
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Error updating customer status:", err);
    }
  };

  // ❌ Delete Customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/auth/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Customer Management</h1>

      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-base text-left text-gray-600">
          <thead className="text-gray-800 border-b border-gray-200 bg-gray-100">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{customer.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === customer._id ? null : customer._id
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center justify-center gap-1 mx-auto"
                    >
                      Manage <IoArrowDownCircleOutline className="text-xl" />
                    </button>

                    {openDropdownId === customer._id && (
                      <div className="absolute right-6 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        {customer.status === "Active" ? (
                          <button
                            onClick={() => handleBlockToggle(customer._id, "Active")}
                            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-1"
                          >
                            Block <MdBlock />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlockToggle(customer._id, "Inactive")}
                            className="block w-full text-left px-4 py-2 hover:bg-green-100 text-green-600 flex items-center gap-1"
                          >
                            Unblock <CgUnblock />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center gap-1"
                        >
                          Delete <MdOutlineDelete />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 📄 Pagination */}
        <div className="flex items-center justify-center gap-4 py-6 text-gray-500 font-medium">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`rounded-full bg-slate-200/50 hover:bg-slate-300 transition ${
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            ◀
          </button>

          <div className="flex items-center gap-2 text-sm font-medium">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-10 w-10 flex items-center justify-center rounded-full ${
                  currentPage === index + 1
                    ? "text-indigo-600 border border-indigo-400"
                    : "hover:text-indigo-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`rounded-full bg-slate-200/50 hover:bg-slate-300 transition ${
              currentPage === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagementPage;
