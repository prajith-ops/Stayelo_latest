// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { CardTitle, CardDescription } from "./ui/Card";
// import { Button } from "./ui/Button";
// import Input from "./ui/Input";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = ({ open, onClose, onLogin }) => {
//   const [flipped, setFlipped] = useState(false);
//   const [cardHeight, setCardHeight] = useState(520);
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [signupForm, setSignupForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     location: "",
//   });

//   const navigate = useNavigate();

//   // 🔹 Adjust card height when flipping
//   useEffect(() => {
//     setCardHeight(flipped ? 650 : 520);
//   }, [flipped]);

//   // ✅ LOGIN HANDLER
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:4000/api/auth/login", loginForm);
//       const { token } = res.data;

//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const { id, email, role } = payload;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify({ id, email, role }));

//       onLogin?.({ id, email, role });
//       onClose?.();
//       alert("Login successful!");

//       if (role === "ADMIN") navigate("/admin");
//       else navigate("/");
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       alert(err.response?.data?.message || "Login failed. Please check your credentials.");
//     }
//   };

//   // ✅ SIGNUP HANDLER (role defaults to CUSTOMER)
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!signupForm.name || !signupForm.email || !signupForm.password) {
//       return alert("Please fill all required fields.");
//     }

//     try {
//       await axios.post("http://localhost:4000/api/auth/signup", {
//         ...signupForm,
//         role: "CUSTOMER", // ✅ Default role
//       });

//       alert("Signup successful! You can now log in.");
//       setFlipped(false);
//     } catch (err) {
//       console.error("❌ Signup Error:", err);
//       alert(err.response?.data?.message || "Signup failed. Try again.");
//     }
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {open && (
//         <motion.div
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="absolute top-20 left-0 w-full h-screen z-20 flex justify-center items-start md:justify-end md:pr-50"
//         >
//           <motion.div
//             className="relative w-full max-w-md"
//             style={{ perspective: "1000px" }}
//             animate={{ height: cardHeight }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//           >
//             <motion.div
//               className="absolute w-full h-full"
//               style={{ transformStyle: "preserve-3d" }}
//               animate={{ rotateY: flipped ? 180 : 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               {/* 🔹 LOGIN SIDE */}
//               <div
//                 className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden"
//                 style={{ backfaceVisibility: "hidden" }}
//               >
//                 <form className="w-full" onSubmit={handleLogin}>
//                   <div className="mb-6 text-center">
//                     <CardTitle className="font-bold text-[30px]">Welcome Back</CardTitle>
//                     <CardDescription>Access your hotel dashboard</CardDescription>
//                   </div>

//                   <label>Email</label>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="mb-4 w-full mt-2"
//                     value={loginForm.email}
//                     onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
//                     required
//                   />

//                   <label>Password</label>
//                   <Input
//                     type="password"
//                     placeholder="Enter your password"
//                     className="mb-4 w-full mt-2"
//                     value={loginForm.password}
//                     onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//                     required
//                   />

//                   <div className="mb-3 flex justify-between items-center">
//                     <label className="flex items-center">
//                       <input type="checkbox" className="mr-2" /> Remember me
//                     </label>
//                     <a href="#" className="text-blue-500 text-sm">
//                       Forgot password?
//                     </a>
//                   </div>

//                   <Button variant="default" className="w-full mb-2 cursor-pointer" type="submit">
//                     Login
//                   </Button>

//                   <div className="relative flex py-2 items-center">
//                     <div className="flex-grow border-t border-gray-300"></div>
//                     <span className="mx-2 text-gray-500 text-sm">Or</span>
//                     <div className="flex-grow border-t border-gray-300"></div>
//                   </div>

//                   <Button
//                     variant="subtle"
//                     className="w-full mb-2 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <img src="/google-logo.png" alt="Google" className="w-8 h-5" />
//                     Sign in with Google
//                   </Button>

//                   <p className="flex justify-center text-slate-500 mt-4">
//                     Don’t have an account?{" "}
//                     <button
//                       type="button"
//                       onClick={() => setFlipped(true)}
//                       className="text-blue-500 ml-1 cursor-pointer"
//                     >
//                       Sign up
//                     </button>
//                   </p>
//                 </form>
//               </div>

//               {/* 🔹 SIGNUP SIDE */}
//               <div
//                 className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 overflow-y-auto"
//                 style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
//               >
//                 <form className="w-full" onSubmit={handleSignup}>
//                   <div className="mb-6 text-center">
//                     <CardTitle className="font-bold text-[30px]">Create Account</CardTitle>
//                     <CardDescription>Join and manage your bookings easily</CardDescription>
//                   </div>

//                   <label>Full Name</label>
//                   <Input
//                     type="text"
//                     placeholder="Enter your full name"
//                     className="mb-4 w-full mt-2"
//                     value={signupForm.name}
//                     onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
//                     required
//                   />

//                   <label>Email</label>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="mb-4 w-full mt-2"
//                     value={signupForm.email}
//                     onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
//                     required
//                   />

//                   <label>Password</label>
//                   <Input
//                     type="password"
//                     placeholder="Create a password"
//                     className="mb-4 w-full mt-2"
//                     value={signupForm.password}
//                     onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
//                     required
//                   />

//                   <label>Phone (optional)</label>
//                   <Input
//                     type="text"
//                     placeholder="Enter your phone number"
//                     className="mb-4 w-full mt-2"
//                     value={signupForm.phone}
//                     onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
//                   />

//                   <label>Location (optional)</label>
//                   <Input
//                     type="text"
//                     placeholder="Enter your city or location"
//                     className="mb-4 w-full mt-2"
//                     value={signupForm.location}
//                     onChange={(e) => setSignupForm({ ...signupForm, location: e.target.value })}
//                   />

//                   <Button variant="default" className="w-full mb-2 cursor-pointer" type="submit">
//                     Sign Up
//                   </Button>

//                   <p className="flex justify-center text-slate-500 mt-4">
//                     Already have an account?{" "}
//                     <button
//                       type="button"
//                       onClick={() => setFlipped(false)}
//                       className="text-blue-500 ml-1 cursor-pointer"
//                     >
//                       Login
//                     </button>
//                   </p>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Login;















import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CardTitle, CardDescription } from "./ui/Card";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ open, onClose, onLogin }) => {
  const [flipped, setFlipped] = useState(false);
  const [cardHeight, setCardHeight] = useState(520);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const navigate = useNavigate();

  // 🔹 Adjust card height dynamically
  useEffect(() => {
    setCardHeight(flipped ? 650 : 520);
  }, [flipped]);

  // ✅ LOGIN HANDLER
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:4000/api/auth/login", loginForm);
  //     const { token } = res.data;

  //     // Decode JWT to extract user info
  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     const { id, email, role } = payload;

  //     // Save user data to localStorage
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", JSON.stringify({ id, email, role }));

  //     // ✅ Dispatch custom event to trigger same-tab auth sync
  //     window.dispatchEvent(new Event("authChanged"));

  //     // Notify parent component (if any)
  //     onLogin?.({ id, email, role });
  //     onClose?.();

  //     alert("✅ Login successful!");

  //     // Redirect based on role
  //     if (role === "ADMIN") navigate("/admin");
  //     else navigate("/");
  //   } catch (err) {
  //     console.error("❌ Login Error:", err);
  //     alert(err.response?.data?.message || "Login failed. Please check your credentials.");
  //   }
  // };



  // ✅ LOGIN HANDLER
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:4000/api/auth/login", loginForm);
    const { token, user } = res.data;

    // Save both token and full user details
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Dispatch event to sync login across app
    window.dispatchEvent(new Event("authChanged"));

    alert("✅ Login successful!");

    onLogin?.(user);
    onClose?.();

    // Redirect based on role
    if (user.role === "ADMIN") navigate("/admin");
    else navigate("/");
  } catch (err) {
    console.error("❌ Login Error:", err);
    alert(err.response?.data?.message || "Login failed. Please check your credentials.");
  }
};


  // ✅ SIGNUP HANDLER (default role: CUSTOMER)
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      return alert("Please fill all required fields.");
    }

    try {
      await axios.post("http://localhost:4000/api/auth/signup", {
        ...signupForm,
        role: "CUSTOMER",
      });

      alert("✅ Signup successful! You can now log in.");
      setFlipped(false);
    } catch (err) {
      console.error("❌ Signup Error:", err);
      alert(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20 flex justify-center items-start md:justify-end md:pr-50"
        >
          <motion.div
            className="relative w-full max-w-md"
            style={{ perspective: "1000px" }}
            animate={{ height: cardHeight }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 🔹 LOGIN SIDE */}
              <div
                className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <form className="w-full" onSubmit={handleLogin}>
                  <div className="mb-6 text-center">
                    <CardTitle className="font-bold text-[30px]">Welcome Back</CardTitle>
                    <CardDescription>Access your hotel dashboard</CardDescription>
                  </div>

                  <label>Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-4 w-full mt-2"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />

                  <label>Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="mb-4 w-full mt-2"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />

                  <div className="mb-3 flex justify-between items-center">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Remember me
                    </label>
                    <a href="#" className="text-blue-500 text-sm">
                      Forgot password?
                    </a>
                  </div>

                  <Button variant="default" className="w-full mb-2" type="submit">
                    Login
                  </Button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <Button
                    variant="subtle"
                    className="w-full mb-2 flex items-center justify-center gap-2"
                  >
                    <img src="/google-logo.png" alt="Google" className="w-8 h-5" />
                    Sign in with Google
                  </Button>

                  <p className="flex justify-center text-slate-500 mt-4">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlipped(true)}
                      className="text-blue-500 ml-1"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </div>

              {/* 🔹 SIGNUP SIDE */}
              <div
                className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 overflow-y-auto"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <form className="w-full" onSubmit={handleSignup}>
                  <div className="mb-6 text-center">
                    <CardTitle className="font-bold text-[30px]">Create Account</CardTitle>
                    <CardDescription>Join and manage your bookings easily</CardDescription>
                  </div>

                  <label>Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="mb-4 w-full mt-2"
                    value={signupForm.name}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, name: e.target.value })
                    }
                    required
                  />

                  <label>Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-4 w-full mt-2"
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, email: e.target.value })
                    }
                    required
                  />

                  <label>Password</label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    className="mb-4 w-full mt-2"
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, password: e.target.value })
                    }
                    required
                  />

                  <label>Phone (optional)</label>
                  <Input
                    type="text"
                    placeholder="Enter your phone number"
                    className="mb-4 w-full mt-2"
                    value={signupForm.phone}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, phone: e.target.value })
                    }
                  />

                  <label>Location (optional)</label>
                  <Input
                    type="text"
                    placeholder="Enter your city or location"
                    className="mb-4 w-full mt-2"
                    value={signupForm.location}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, location: e.target.value })
                    }
                  />

                  <Button variant="default" className="w-full mb-2" type="submit">
                    Sign Up
                  </Button>

                  <p className="flex justify-center text-slate-500 mt-4">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlipped(false)}
                      className="text-blue-500 ml-1"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
