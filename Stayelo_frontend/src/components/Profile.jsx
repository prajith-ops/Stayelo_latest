// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Edit, Save, X, Phone, MapPin, LogOut, Camera } from "lucide-react";
// import axios from "axios";

// const Profile = ({ open, onClose, onProfileUpdate }) => {
//   const [flipped, setFlipped] = useState(false);
//   const [profilePic, setProfilePic] = useState(
//     "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//   );
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch logged-in user profile
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         alert("Please log in to view your profile.");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:4000/api/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = res.data;
//         setUser(userData);
//         setFormData(userData);
//         if (userData.profilePic) setProfilePic(userData.profilePic);
//       } catch (err) {
//         console.error("❌ Error fetching user profile:", err);
//         alert(err.response?.data?.message || "Failed to fetch user profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // ✅ Save updated profile to backend
//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You are not logged in!");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:4000/api/auth/update-profile",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const updatedUser = res.data.user;
//       setUser(updatedUser);
//       setFlipped(false);
//       alert("✅ Profile updated successfully!");

//       // ✅ Notify Navbar about the update
//       if (typeof onProfileUpdate === "function") {
//         onProfileUpdate(updatedUser);
//       }

//       // ✅ Save updated user in localStorage too
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//     } catch (err) {
//       console.error("❌ Error updating profile:", err);
//       alert(err.response?.data?.message || "Error updating profile.");
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ ...user });
//     setFlipped(false);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   // ✅ Change profile picture (frontend preview)
//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const preview = URL.createObjectURL(file);
//       setProfilePic(preview);
//       setFormData({ ...formData, profilePic: preview });
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//   }, [open]);

//   if (!open) return null;

//   if (loading)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white text-lg">
//         Loading profile...
//       </div>
//     );

//   if (!user)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white text-lg">
//         No user record found. Please log in again.
//       </div>
//     );

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: -80 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="relative w-full max-w-md h-[550px]"
//             style={{ perspective: "1000px" }}
//           >
//             <motion.div
//               className="absolute w-full h-full"
//               style={{ transformStyle: "preserve-3d" }}
//               animate={{ rotateY: flipped ? 180 : 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               {/* FRONT SIDE */}
//               <div
//                 className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 text-center"
//                 style={{ backfaceVisibility: "hidden" }}
//               >
//                 <button
//                   onClick={onClose}
//                   className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={20} />
//                 </button>

//                 <div className="relative w-32 h-32 mx-auto mt-4">
//                   <img
//                     src={profilePic}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-md"
//                   />
//                   <label
//                     htmlFor="profilePicUpload"
//                     className="absolute bottom-1 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer shadow-md"
//                   >
//                     <Camera size={16} />
//                   </label>
//                   <input
//                     id="profilePicUpload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePicChange}
//                     className="hidden"
//                   />
//                 </div>

//                 <h3 className="font-semibold text-lg mt-4">{user?.name}</h3>
//                 <p className="text-gray-600 text-sm">{user?.email}</p>

//                 <div className="mt-4 space-y-2 text-sm text-left">
//                   <div className="flex items-center justify-center text-gray-700">
//                     <Phone className="mr-2 text-gray-400" size={16} />
//                     <span>{user.phone || "Phone not added"}</span>
//                   </div>
//                   <div className="flex items-center justify-center text-gray-700">
//                     <MapPin className="mr-2 text-gray-400" size={16} />
//                     <span>{user.location || "No location set"}</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-col gap-3">
//                   <button
//                     onClick={() => setFlipped(true)}
//                     className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center transition-all"
//                   >
//                     <Edit size={16} className="mr-2" /> Edit Profile
//                   </button>
//                   <button
//                     onClick={handleSignOut}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg flex items-center justify-center transition-all"
//                   >
//                     <LogOut size={16} className="mr-2" /> Sign Out
//                   </button>
//                 </div>
//               </div>

//               {/* BACK SIDE */}
//               <div
//                 className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6"
//                 style={{
//                   transform: "rotateY(180deg)",
//                   backfaceVisibility: "hidden",
//                 }}
//               >
//                 <h2 className="text-center text-xl font-semibold mb-4">
//                   Edit Profile
//                 </h2>

//                 <div className="space-y-4 text-left">
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name || ""}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-700">
//                       Phone
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.phone || ""}
//                       onChange={(e) =>
//                         setFormData({ ...formData, phone: e.target.value })
//                       }
//                       className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-gray-700">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.location || ""}
//                       onChange={(e) =>
//                         setFormData({ ...formData, location: e.target.value })
//                       }
//                       className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-6">
//                   <button
//                     onClick={handleSave}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg flex items-center justify-center"
//                   >
//                     <Save size={16} className="mr-2" /> Save
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center"
//                   >
//                     <X size={16} className="mr-2" /> Cancel
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Profile;












import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Save, X, Phone, MapPin, LogOut, Camera } from "lucide-react";
import axios from "axios";

const Profile = ({ open, onClose, onProfileUpdate }) => {
  const [flipped, setFlipped] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user profile with fallback to localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // If no token, fallback to localStorage
      if (!token) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setFormData(parsedUser);
          if (parsedUser.profilePic) setProfilePic(parsedUser.profilePic);
        }
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;
        setUser(userData);
        setFormData(userData);
        if (userData.profilePic) setProfilePic(userData.profilePic);

        // Ensure Navbar and localStorage are in sync
        localStorage.setItem("user", JSON.stringify(userData));
        if (typeof onProfileUpdate === "function") onProfileUpdate(userData);
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);

        // Unauthorized → log out
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
          return;
        }

        // Fallback to localStorage if API fails
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setFormData(parsedUser);
          if (parsedUser.profilePic) setProfilePic(parsedUser.profilePic);
        } else {
          alert(err.response?.data?.message || "Failed to fetch user profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [onProfileUpdate]);

  // ✅ Save updated profile
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not logged in!");

    try {
      const res = await axios.put(
        "http://localhost:4000/api/auth/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = res.data.user;
      setUser(updatedUser);
      setFlipped(false);
      alert("✅ Profile updated successfully!");

      // Update Navbar and localStorage
      if (typeof onProfileUpdate === "function") onProfileUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert(err.response?.data?.message || "Error updating profile.");
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setFlipped(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfilePic(preview);
      setFormData({ ...formData, profilePic: preview });
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white text-lg">
        Loading profile...
      </div>
    );

  if (!user) return null; // Will not show "No user record found" anymore

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-md h-[550px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>

                <div className="relative w-32 h-32 mx-auto mt-4">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-md"
                  />
                  <label
                    htmlFor="profilePicUpload"
                    className="absolute bottom-1 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer shadow-md"
                  >
                    <Camera size={16} />
                  </label>
                  <input
                    id="profilePicUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </div>

                <h3 className="font-semibold text-lg mt-4">{user?.name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>

                <div className="mt-4 space-y-2 text-sm text-left">
                  <div className="flex items-center justify-center text-gray-700">
                    <Phone className="mr-2 text-gray-400" size={16} />
                    <span>{user.phone || "Phone not added"}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-700">
                    <MapPin className="mr-2 text-gray-400" size={16} />
                    <span>{user.location || "No location set"}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setFlipped(true)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg flex items-center justify-center transition-all"
                  >
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </button>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <h2 className="text-center text-xl font-semibold mb-4">Edit Profile</h2>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg flex items-center justify-center"
                  >
                    <Save size={16} className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center"
                  >
                    <X size={16} className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Profile;
