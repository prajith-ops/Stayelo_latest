import React from "react";

const leadership = [
  {
    name: "Viju Wilson",
    title: "Founder & CEO",
    description:
      "Viju is the visionary behind Stayelo, with 15 years of experience in the tech and travel industries.",
    img: "/roshan.png",
  },
  {
    name: "Viju Wilson",
    title: "Chief Technology Officer",
    description:
      "Viju leads our engineering team, building the robust and scalable platform that powers Stayelo.",
    img: "/roshan.png",
  },
  {
    name: "Viju Wilson",
    title: "Head of Product",
    description:
      "Vij is dedicated to understanding our users’ needs and translating them into amazing features.",
    img: "/roshan.png",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans mt-26">
     
      {/* Hero */}
      <div className="relative w-full h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1449247613801-ab06418e2861"
          alt="Lobby"
          className="w-full h-full object-cover rounded-b-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/60 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center drop-shadow mb-6">
            Redefining Hospitality for <br /> the Modern World
          </h1>
          <p className="text-lg md:text-2xl text-center max-w-2xl drop-shadow mb-2">
            Crafting seamless and memorable travel experiences through innovative technology and a passion for service.
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6 py-20">
        <div>
          <h2 className="font-bold text-3xl mb-5 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to empower hoteliers and delight travelers by providing a seamless, intuitive, and powerful booking and management platform. We strive to simplify the complexities of travel, making every stay a perfect experience from booking to check-out.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-3xl mb-5 text-gray-900">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We envision a future where every journey is effortless and every stay is exceptional. By harnessing the power of technology and human-centric design, we aim to become the world’s most trusted partner in hospitality, connecting people with unforgettable places.
          </p>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto my-20 px-10 py-16">
        <h3 className="font-semibold text-4xl text-center mb-12">What Drives Us</h3>
        <p className="text-center text-lg text-gray-600 mb-14">
          Our core values are the bedrock of our company culture and guide every decision we make.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
          <div>
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
              <svg fill="none" viewBox="0 0 24 24" className="w-9 h-9 text-blue-700">
                <path d="M12 2v20m0 0l8-8m-8 8L4 14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl mb-2">Innovation</h4>
            <p className="text-md text-gray-500">
              We constantly push boundaries to create smarter, more efficient solutions for the hospitality industry.
            </p>
          </div>
          <div>
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
              <svg fill="none" viewBox="0 0 24 24" className="w-9 h-9 text-blue-700">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl mb-2">Customer-Centricity</h4>
            <p className="text-md text-gray-500">
              Our clients and their guests are at the heart of everything we do. Their success is our success.
            </p>
          </div>
          <div>
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
              <svg fill="none" viewBox="0 0 24 24" className="w-9 h-9 text-blue-700">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h4 className="font-semibold text-xl mb-2">Integrity</h4>
            <p className="text-md text-gray-500">
              We operate with unwavering honesty, transparency, and commitment to doing what’s right.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto my-24 px-8">
        <h3 className="font-semibold text-4xl text-center mb-8">Our Story</h3>
        <p className="text-center text-lg text-gray-600 mb-10">
          From a simple idea to a global platform, our journey has been one of passion and perseverance.
        </p>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full"></div>
          <div className="flex flex-col space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-20">
            <div className="flex flex-col md:items-end md:pr-10">
              <span className="font-semibold text-blue-900 text-lg mb-1">2018 – The Idea</span>
              <span className="text-gray-700 text-md">
                Stayelo was born from a vision to simplify hotel management for independent owners.
              </span>
            </div>
            <div />
            <div />
            <div className="flex flex-col md:items-start md:pl-10">
              <span className="font-semibold text-blue-900 text-lg mb-1">2020 – First 100 Hotels</span>
              <span className="text-gray-700 text-md">
                We celebrated a major milestone, partnering with over 100 boutique hotels across Europe.
              </span>
            </div>
            <div className="flex flex-col md:items-end md:pr-10">
              <span className="font-semibold text-blue-900 text-lg mb-1">2022 – Global Expansion</span>
              <span className="text-gray-700 text-md">
                Our platform went global, with partnerships from North America and Asia.
              </span>
            </div>
            <div />
            <div />
            <div className="flex flex-col md:items-start md:pl-10">
              <span className="font-semibold text-blue-900 text-lg mb-1">2024 – Traveler App Launch</span>
              <span className="text-gray-700 text-md">
                We launched our mobile app, putting seamless booking in the hands of millions of travelers.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto my-20 px-10 py-16">
        <h3 className="font-semibold text-4xl text-center mb-10">Meet the Leadership</h3>
        <p className="text-center text-lg text-gray-600 mb-14">
          The passionate minds leading Stayelo towards a brighter future in hospitality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {leadership.map((person, idx) => (
            <div key={person.name} className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-blue-200 shadow">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-lg">{person.name}</h4>
              <span className="text-blue-800 text-base mb-2">{person.title}</span>
              <p className="text-gray-600 text-center text-md">{person.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Journey Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-14 mt-20 rounded-xl mx-auto max-w-6xl shadow-lg px-8">
        <h3 className="font-semibold text-2xl md:text-3xl mb-3">Join Our Journey</h3>
        <p className="text-xl mb-8">
          We’re always looking for talented individuals to join our team. Explore our open positions or find your next perfect stay.
        </p>
        <div className="space-x-5">
          <button className="bg-white text-blue-900 px-7 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-100 transition">Explore Careers</button>
          <button className="bg-blue-700 px-7 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition">Book a Stay</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 py-10 px-8 border-t-2 shadow-inner">
        <div className="flex flex-col md:flex-row md:justify-between max-w-6xl mx-auto">
          <div className="mb-8">
            <h5 className="font-semibold mb-2 text-lg">SOLUTIONS</h5>
            <ul className="text-gray-500 text-base space-y-1">
              <li>Booking Engine</li>
              <li>Management</li>
              <li>Marketing</li>
            </ul>
          </div>
          <div className="mb-8">
            <h5 className="font-semibold mb-2 text-lg">COMPANY</h5>
            <ul className="text-gray-500 text-base space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div className="mb-8">
            <h5 className="font-semibold mb-2 text-lg">LEGAL</h5>
            <ul className="text-gray-500 text-base space-y-1">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="mb-8 flex flex-col items-end">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-900 h-5 w-5 rounded-sm" />
              <span className="font-semibold text-xl">Stayelo</span>
            </div>
            <span className="text-base text-gray-400 mt-2">Effortless Stays. Unforgettable Journeys.</span>
          </div>
        </div>
        <div className="text-gray-400 text-base text-left mt-8">
          © 2024 Stayelo, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
