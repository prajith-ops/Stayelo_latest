// import React, { useState, useEffect } from "react";
// import { FaHotel } from "react-icons/fa6";
// import { TiThMenu } from "react-icons/ti";
// import { Button } from "./ui/Button";
// import ResponsiveMenu from "./ResponsiveMenu";
// import Login from "./Login";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// const Navbar = () => {
//   const [open, setOpen] = useState(false); // mobile menu
//   const [openLogin, setOpenLogin] = useState(false); // login popup
//   const [user, setUser] = useState(null); // logged-in user
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Detect scroll for navbar background change
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//     }
//   }, []);

//   // ✅ Handle logout
//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   // ✅ Handle successful login
//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));

//     // 👇 Auto redirect based on role
//     if (userData.role === "admin") {
//       navigate("/adminDashboard");
//     } else if (userData.role === "user") {
//       navigate("/");
//     }

//     setOpenLogin(false);
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//           scrolled || location.pathname !== "/"
//             ? "bg-white/20 backdrop-blur-sm shadow-md text-gray-800"
//             : "bg-transparent text-white"
//         }`}
//       >
//         <div className="flex justify-between items-center py-8 px-6">
//           {/* Logo */}
//           <div className={`${
//                   scrolled || location.pathname !== "/"
//                     ? "text-gray-900 flex items-center gap-4 font-bold text-2xl"
//                     : "text-white flex items-center gap-4 font-bold text-2xl"
//                 }`}>
//             <FaHotel size={30} />
//             <div className="flex flex-row text-4xl text-white transition-colors duration-300">
//               <p
//                 className={`${
//                   scrolled || location.pathname !== "/"
//                     ? "text-gray-900"
//                     : "text-white"
//                 }`}
//               >
//                 Stay
//               </p>
//               <p className="text-cyan-300">elo</p>
//             </div>
//           </div>

//           {/* Navigation links */}
//           <div className="hidden md:block">
//             {user && user.role === "admin" ? (
//               <ul className="flex items-center gap-6 text-white">
//                 <li>
//                   {/* Add admin links here if any */}
//                 </li>
//               </ul>
//             ) : (
//               <ul className="flex items-center gap-6">
//                 <li>
//                   <a
//                     href="/"
//                     className="inline-block py-1 px-3 hover:text-cyan-500 font-semibold"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/rooms"
//                     className="inline-block py-1 px-3 hover:text-cyan-500 font-semibold"
//                   >
//                     Rooms
//                   </a>
//                 </li>
//                 <li>
//                   <button
//                     type="button"
//                     onClick={() => navigate("/about")}
//                     className="inline-block py-1 px-3 hover:text-cyan-500 font-semibold focus:outline-none bg-transparent"
//                   >
//                     About Us
//                   </button>
//                 </li>
//                 <li>
//                   <a
//                     href="/contact"
//                     className="inline-block py-1 px-3 hover:text-cyan-500 font-semibold"
//                   >
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             )}
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-2">
//             {user ? (
//               <>
//                 {user.role === "user" && (
//                   <>
//                     <span className="text-white font-semibold">
//                       Hello, {user.name}
//                     </span>
//                     {/* Profile dropdown */}
//                     <Menu as="div" className="relative ml-3">
//                       <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//                         <span className="absolute -inset-1.5" />
//                         <span className="sr-only">Open user menu</span>
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//                           className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
//                         />
//                       </MenuButton>
//                       {/* <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//   <span className="absolute -inset-1.5" />
//   <span className="sr-only">Open user menu</span>
//   <img
//     alt={user.name}
//     src={user.profileImage || "/WhatsApp Image 2025-10-24 at 10.55.51_d78d4f17.jpg"}
//     className="w-8 h-8 rounded-full object-cover border border-gray-300"
//   />
// </MenuButton> */}

//                       <MenuItems
//                         transition
//                         className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-indigo-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//                       >
//                         <MenuItem>
//                           <a
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
//                           >
//                             Your profile
//                           </a>
//                         </MenuItem>
//                         <MenuItem>
//                           <a
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
//                           >
//                             Settings
//                           </a>
//                         </MenuItem>
//                         <MenuItem>
//                           <a
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
//                             onClick={handleLogout}
//                           >
//                             Sign out
//                           </a>
//                         </MenuItem>
//                       </MenuItems>
//                     </Menu>
//                   </>
//                 )}

//                 {user.role === "admin" && (
//                   <span className="text-black font-semibold">
//                     Hello, System Admin
//                   </span>
//                 )}
//               </>
//             ) : (
//               <Button
//                 variant="default"
//                 className="rounded-4xl cursor-pointer text-lg font-bold"
//                 onClick={() => setOpenLogin(!openLogin)}
//               >
//                 Log in
//               </Button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden" onClick={() => setOpen(!open)}>
//             <TiThMenu className="text-4xl text-white" />
//           </div>
//         </div>
//       </nav>

//       {/* Mobile menu */}
//       <ResponsiveMenu open={open} />

//       {/* Login popup */}
//       <Login
//         open={openLogin}
//         onClose={() => setOpenLogin(false)}
//         onLogin={handleLoginSuccess}
//       />
//     </>
//   );
// };

// export default Navbar;








import React, { useState, useEffect } from "react";
import { FaHotel } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Button } from "./ui/Button";
import ResponsiveMenu from "./ResponsiveMenu";
import Login from "./Login";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Theme is controlled internally here; if you want to lift it into App, modify accordingly
  const [theme, setTheme] = useState(
    localStorage.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll event to set navbar background/text color state
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Apply theme class to document.documentElement and persist choice
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.theme = theme;
  }, [theme]);

  // Determines text color depending on navbar background
  const textColor =
    scrolled || location.pathname !== "/" ? "text-gray-900 dark:text-white" : "text-white";

  // Called on successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setJustLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setOpenLogin(false);
  };

  // Redirect based on role after successful login
  useEffect(() => {
    if (justLoggedIn && user) {
      if (user.role === "ADMIN") navigate("/adminDashboard");
      else navigate("/");
      setJustLoggedIn(false);
    }
  }, [justLoggedIn, user, navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || location.pathname !== "/"
            ? "bg-white/30 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center py-6 px-6">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className={`flex items-center gap-4 font-bold text-2xl cursor-pointer ${textColor}`}
          >
            <FaHotel size={30} />
            <div className="flex flex-row text-4xl">
              <p className={textColor}>Stay</p>
              <p className="text-cyan-300">leo</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:block">
            {user?.role === "ADMIN" ? (
              <ul className="flex items-center gap-6 font-semibold text-gray-900">
                <li>
                  <a
                    href="/adminDashboard"
                    className="inline-block py-1 px-3 hover:text-cyan-500"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            ) : (
              <ul className={`flex items-center gap-6 font-semibold ${textColor}`}>
                <li>
                  <a href="/" className="py-1 px-3 hover:text-cyan-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/rooms" className="py-1 px-3 hover:text-cyan-400">
                    Rooms
                  </a>
                </li>
                {user?.role === "CUSTOMER" && (
                  <li>
                    <a href="/my-bookings" className="py-1 px-3 hover:text-cyan-400">
                      My Bookings
                    </a>
                  </li>
                )}
                <li>
                  <a href="/about" className="py-1 px-3 hover:text-cyan-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="py-1 px-3 hover:text-cyan-400">
                    Contact
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <>
                {user.role === "CUSTOMER" && (
                  <>
                    <span className={`font-semibold ${textColor}`}>
                      Hello, {user.name?.split(" ")[0] || "Guest"}
                    </span>
                    {/* Profile Avatar */}
                    <div
                      className="relative ml-3 cursor-pointer"
                      onClick={() => setProfileOpen(true)}
                    >
                      <img
                        alt="profile"
                        src={
                          user?.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        className="h-9 w-9 rounded-full bg-gray-800 border-2 border-cyan-500 hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </>
                )}

                {user.role === "ADMIN" && (
                  <>
                    <span className="text-gray-900 font-semibold">Hello, System Admin</span>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Button
                variant="default"
                className="rounded-full cursor-pointer text-lg font-bold"
                onClick={() => setOpenLogin(!openLogin)}
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <TiThMenu
              className={`text-4xl cursor-pointer ${
                scrolled || location.pathname !== "/" ? "text-gray-900" : "text-white"
              }`}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ResponsiveMenu
        open={open}
        user={user}
        onLogout={handleLogout}
        onLogin={handleLoginSuccess}
        closeMenu={() => setOpen(false)}
      />

      {/* Login Popup */}
      <Login open={openLogin} onClose={() => setOpenLogin(false)} onLogin={handleLoginSuccess} />

      {/* Profile Popup */}
      <Profile
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onProfileUpdate={(updatedUser) => {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }}
      />
    </>
  );
};

export default Navbar;
