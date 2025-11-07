// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Hero from "../components/Hero";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "../components/ui/Card";
// import { LuBrain } from "react-icons/lu";
// import { MdOutlineSecurity } from "react-icons/md";
// import { FaRegClock } from "react-icons/fa";
// import { FiMail } from "react-icons/fi";
// import { SiSimpleanalytics } from "react-icons/si";
// import { HiOutlineDeviceMobile } from "react-icons/hi";
// import { hotelRooms } from "../components/HotelRoomsDummy";
// import { Button } from "../components/ui/Button";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Footer from "../components/Footer";

// const Home = () => {
//   const navigate = useNavigate();
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
//   const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
//   const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

//   // 🧠 AI Recommendation state
//   const [recommendedRooms, setRecommendedRooms] = useState([]);
//   const [loadingRecommendations, setLoadingRecommendations] = useState(false);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setPrevBtnEnabled(emblaApi.canScrollPrev());
//       setNextBtnEnabled(emblaApi.canScrollNext());
//     };

//     emblaApi.on("select", onSelect);
//     onSelect();

//     return () => emblaApi.off("select", onSelect);
//   }, [emblaApi]);

//   const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
//   const scrollNext = () => emblaApi && emblaApi.scrollNext();

//   // 🧩 Fetch AI Recommendations
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return; // Only fetch if logged in

//     const fetchRecommendations = async () => {
//       try {
//         setLoadingRecommendations(true);
//         const response = await axios.get(
//           "http://localhost:4000/api/recommendations",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setRecommendedRooms(response.data.recommendedRooms || []);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       } finally {
//         setLoadingRecommendations(false);
//       }
//     };

//     fetchRecommendations();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
//       <Hero />

//       {/* ✅ AI Recommendations Section */}
//       {recommendedRooms.length > 0 && (
//         <div className="flex flex-col justify-center items-center mt-20 gap-10 bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
//           <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center flex items-center gap-3">
//             <LuBrain className="text-blue-500" />
//             Recommended for You
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mt-1 text-center max-w-2xl">
//             Personalized room suggestions, powered by AI — based on your past booking preferences.
//           </p>

//           {loadingRecommendations ? (
//             <p className="text-gray-500 dark:text-gray-400">Loading recommendations...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//               {recommendedRooms.map((room) => (
//                 <Card
//                   key={room._id}
//                   className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
//                 >
//                   <CardHeader className="p-0">
//                     <img
//                       src={room.image}
//                       alt={room.name}
//                       className="w-full h-48 object-cover"
//                     />
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <CardTitle className="text-lg font-semibold">
//                       {room.name}
//                     </CardTitle>
//                     <CardDescription className="text-gray-600 dark:text-gray-300">
//                       {room.location}
//                     </CardDescription>
//                     <p className="text-blue-600 font-bold mt-2">
//                       ₹{room.pricePerNight} / night
//                     </p>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//                       ⭐ {room.rating}
//                     </p>
//                   </CardContent>
//                   <div className="flex justify-between items-center p-4">
//                     <Button
//                       variant="default"
//                       onClick={() => navigate(`/roomdetails/${room._id}`)}
//                     >
//                       Book Now
//                     </Button>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       {room.guests || 2} Guests
//                     </span>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

      // {/* Existing “Why Choose Stayelo?” Section */}
      // <div className="flex flex-col justify-center items-center mt-20 gap-10 dark:bg-gray-900 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
      //   <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center">
      //     Why Choose Stayelo ?
      //   </h1>
      //   <p className="text-gray-600 dark:text-gray-300 mt-1 text-center">
      //     Experience the perfect blend of luxury, technology, and personalized service.
      //   </p>
      //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <LuBrain className="text-blue-500 text-4xl" />
      //         <CardTitle>AI-Powered Recommendations</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         Smart suggestions tailored to your preferences, ensuring you find the perfect stay every time.
      //       </CardDescription>
      //     </Card>
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <MdOutlineSecurity className="text-blue-500 text-4xl" />
      //         <CardTitle>Secure Booking</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         JWT authentication ensures your data and transactions are safe and secure.
      //       </CardDescription>
      //     </Card>
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <FaRegClock className="text-blue-500 text-4xl" />
      //         <CardTitle>24/7 Support</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         Round-the-clock customer service and instant booking confirmations for a hassle-free experience.
      //       </CardDescription>
      //     </Card>
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <div className="bg-fuchsia-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
      //           <FiMail className="text-fuchsia-800 w-6 h-6" />
      //         </div>
      //         <CardTitle>Email Notifications</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         Instant email alerts for bookings, promotions, and updates to keep you informed.
      //       </CardDescription>
      //     </Card>
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <div className="bg-orange-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
      //           <SiSimpleanalytics className="text-orange-800 w-6 h-6" />
      //         </div>
      //         <CardTitle>Analytics Dashboard</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         Comprehensive reporting and revenue analytics for administrators to optimize operations.
      //       </CardDescription>
      //     </Card>
      //     <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
      //       <CardHeader className="flex items-center gap-4">
      //         <div className="bg-purple-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
      //           <HiOutlineDeviceMobile className="text-purple-500 w-6 h-6" />
      //         </div>
      //         <CardTitle>Mobile Optimized</CardTitle>
      //       </CardHeader>
      //       <CardDescription className="text-center text-gray-700 dark:text-gray-300">
      //         Fully responsive design for seamless booking experiences on any device.
      //       </CardDescription>
      //     </Card>
      //   </div>
      // </div>

//       {/* Existing Featured Hotels Section */}
//       <div className="flex flex-col justify-center items-center mt-20 gap-10 bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
//         <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center">
//           Featured Hotels
//         </h1>
//         <p className="text-gray-600 dark:text-gray-300 mt-1 text-center">
//           Discover our handpicked selection of top-rated hotels, offering exceptional comfort and service.
//         </p>
//         <div className="relative w-full max-w-6xl mx-auto">
//           <div className="overflow-hidden w-full" ref={emblaRef}>
//             <div className="flex space-x-3">
//               {hotelRooms.map((room) => (
//                 <div
//                   key={room.id}
//                   className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_22%]"
//                 >
//                   <Card className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full group-hover:shadow-xl hover:-translate-y-1 duration-300 transition-all cursor-pointer bg-white dark:bg-gray-800">
//                     <CardHeader className="p-0">
//                       <img
//                         src={room.image}
//                         alt={room.name}
//                         className="w-full h-48 object-cover"
//                       />
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CardTitle className="text-lg font-semibold">
//                         {room.name}
//                       </CardTitle>
//                       <CardDescription className="text-gray-600 dark:text-gray-300">
//                         {room.hotel} — {room.location}
//                       </CardDescription>
//                       <p className="text-blue-600 font-bold mt-2">
//                         ₹{room.pricePerNight} / night
//                       </p>
//                       <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//                         ⭐ {room.rating}
//                       </p>
//                     </CardContent>
//                     <div className="flex justify-between items-center p-4">
//                       <Button
//                         variant="default"
//                         onClick={() => navigate("/roomdetails")}
//                       >
//                         Book Now
//                       </Button>
//                       <span className="text-sm text-gray-500 dark:text-gray-400">
//                         {room.guests} Guests
//                       </span>
//                     </div>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Prev/Next Buttons */}
//           <button
//             onClick={scrollPrev}
//             disabled={!prevBtnEnabled}
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 transition"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//           </button>
//           <button
//             onClick={scrollNext}
//             disabled={!nextBtnEnabled}
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 transition"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;














import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../components/Hero";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";
import { LuBrain } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { SiSimpleanalytics } from "react-icons/si";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { hotelRooms } from "../components/HotelRoomsDummy";
import { Button } from "../components/ui/Button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  // recommendation state
  const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [preferredType, setPreferredType] = useState("");
  const [explanation, setExplanation] = useState(""); // Gemini text
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // carousel control
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // fetch recommendations
  const fetchRecommendations = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setRecommendedRooms([]);
      setPreferredType("");
      setExplanation("");
      return;
    }

    setIsLoggedIn(true);
    try {
      setLoadingRecommendations(true);
      const response = await axios.get("http://localhost:4000/api/recommendations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecommendedRooms(response.data.recommendations || []);
      setPreferredType(response.data.preferredType || "");
      setExplanation(response.data.explanation || "");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setIsLoggedIn(false);
      }
      setRecommendedRooms([]);
      setPreferredType("");
      setExplanation("");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();

    const onStorage = (e) => {
      if (e.key === "token" || e.key === null) fetchRecommendations();
    };

    const onAuthChanged = () => fetchRecommendations();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  const LoadingShimmer = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-72 rounded-xl" />
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Hero />

      {/* Recommendations when logged in */}
      {isLoggedIn && (
        <div className="flex flex-col justify-center items-center mt-20 gap-10 bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
          <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center flex items-center gap-3">
            <LuBrain className="text-blue-500" />
            Recommended for You
          </h1>

          {explanation && (
            <p className="text-gray-700 dark:text-gray-300 italic text-center max-w-2xl leading-relaxed">
              {explanation}
            </p>
          )}

          {preferredType && (
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-center max-w-2xl">
              You often book{" "}
              <span className="font-semibold text-blue-500">{preferredType}</span> rooms — here are similar options.
            </p>
          )}

          {loadingRecommendations ? (
            <LoadingShimmer />
          ) : recommendedRooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {recommendedRooms.map((room) => (
                <Card
                  key={room._id}
                  className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="p-0">
                    <img
                      src={room.images?.[0] || "/default-room.jpg"}
                      alt={room.type || room.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold">{room.type || room.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{room.location}</CardDescription>
                    <p className="text-blue-600 font-bold mt-2">₹{room.price} / night</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">⭐ {room.rating || "4.5"}</p>
                  </CardContent>
                  <div className="flex justify-between items-center p-4">
                    <Button onClick={() => navigate(`/roomdetails/${room._id}`)}>Book Now</Button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{room.guests || 2} Guests</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No AI recommendations available yet — try booking a few rooms first.
            </p>
          )}
        </div>
      )}

      {/* Featured Hotels + Why Choose Stayelo (when logged out) */}
      {!isLoggedIn && (
        <>
          <div className="flex flex-col justify-center items-center mt-20 gap-10 bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
            <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center">Featured Hotels</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-center">
              Discover our handpicked selection of top-rated hotels.
            </p>

            <div className="relative w-full max-w-6xl mx-auto">
              <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex space-x-3">
                  {hotelRooms.map((room) => (
                    <div key={room.id} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_22%]">
                      <Card className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full group-hover:shadow-xl hover:-translate-y-1 duration-300 transition-all cursor-pointer bg-white dark:bg-gray-800">
                        <CardHeader className="p-0">
                          <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg font-semibold">{room.name}</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-300">
                            {room.hotel} — {room.location}
                          </CardDescription>
                          <p className="text-blue-600 font-bold mt-2">₹{room.pricePerNight} / night</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">⭐ {room.rating}</p>
                        </CardContent>
                        <div className="flex justify-between items-center p-4">
                          <Button onClick={() => navigate("/roomdetails")}>Book Now</Button>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{room.guests} Guests</span>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* 🔹 Why Choose Stayelo Section (only when logged out) */}
          <div className="flex flex-col justify-center items-center mt-20 gap-10 dark:bg-gray-900 px-6 md:px-16 lg:px-24 xl:px-32 w-full">
            <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold md:text-4xl lg:text-5xl text-center">
              Why Choose Stayelo ?
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-center">
              Experience the perfect blend of luxury, technology, and personalized service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <LuBrain className="text-blue-500 text-4xl" />
                  <CardTitle>AI-Powered Recommendations</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  Smart suggestions tailored to your preferences, ensuring you find the perfect stay every time.
                </CardDescription>
              </Card>

              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <MdOutlineSecurity className="text-blue-500 text-4xl" />
                  <CardTitle>Secure Booking</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  JWT authentication ensures your data and transactions are safe and secure.
                </CardDescription>
              </Card>

              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <FaRegClock className="text-blue-500 text-4xl" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  Round-the-clock customer service and instant booking confirmations for a hassle-free experience.
                </CardDescription>
              </Card>

              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <div className="bg-fuchsia-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
                    <FiMail className="text-fuchsia-800 w-6 h-6" />
                  </div>
                  <CardTitle>Email Notifications</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  Instant email alerts for bookings, promotions, and updates to keep you informed.
                </CardDescription>
              </Card>

              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <div className="bg-orange-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
                    <SiSimpleanalytics className="text-orange-800 w-6 h-6" />
                  </div>
                  <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  Comprehensive reporting and revenue analytics for administrators to optimize operations.
                </CardDescription>
              </Card>

              <Card className="flex justify-center items-center shadow-none border-none bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-full p-3 flex items-center justify-center w-12 h-12">
                    <HiOutlineDeviceMobile className="text-purple-500 w-6 h-6" />
                  </div>
                  <CardTitle>Mobile Optimized</CardTitle>
                </CardHeader>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300">
                  Fully responsive design for seamless booking experiences on any device.
                </CardDescription>
              </Card>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
