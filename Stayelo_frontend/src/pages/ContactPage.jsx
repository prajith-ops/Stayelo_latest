import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  MapPinIcon as LocationMarkerIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out to StayElo! We'll respond soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-12 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-2 text-blue-800">Contact StayElo</h1>
          <p className="text-gray-600 text-lg">
            We’re here to make your stay as smooth as possible — reach out for any assistance.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Contact Form */}
          <div className="flex-1.5 bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">
              Send Us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 overflow-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                name="message"
                placeholder="Tell us about your booking, inquiry, or issue..."
                rows="5"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg w-fit shadow-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Info Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Get in Touch */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Get in Touch
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-gray-600">+91 484 9876543</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MailIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">support@stayelo.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <LocationMarkerIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Head Office</p>
                    <p className="text-gray-600 text-sm">
                      StayElo Hospitality Pvt. Ltd.
                      <br />
                      Marine Drive, Kochi
                      <br />
                      Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 9:00 AM - 8:00 PM <br />
                      Saturday: 10:00 AM - 6:00 PM <br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Emergency Support
              </h2>
              <p className="text-gray-600 mb-3">
                Need urgent help with your booking or stay? Our 24/7 helpline is always open.
              </p>
              <div className="flex items-center gap-3 mb-2">
                <PhoneIcon className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-gray-600">+91 99999 88888</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium">WhatsApp Support</p>
                  <p className="text-gray-600">+91 99999 77777</p>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Our Offices
              </h2>
              <div className="space-y-2 text-gray-700">
                <div>
                  <p className="font-medium">Kochi (HQ)</p>
                  <p className="text-sm text-gray-600">Marine Drive, Kochi 682031</p>
                </div>
                <div>
                  <p className="font-medium">Trivandrum</p>
                  <p className="text-sm text-gray-600">Statue Junction, 695001</p>
                </div>
                <div>
                  <p className="font-medium">Munnar</p>
                  <p className="text-sm text-gray-600">Main Bazaar, 685612</p>
                </div>
                <div>
                  <p className="font-medium">Alleppey</p>
                  <p className="text-sm text-gray-600">Boat Jetty Road, 688001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-1">How do I book a room on StayElo?</h3>
              <p className="text-gray-600 mb-3">
                Simply search your destination, select your preferred hotel, choose dates,
                and confirm your booking through our secure payment gateway.
              </p>

              <h3 className="font-semibold mb-1">Can I cancel or modify my booking?</h3>
              <p className="text-gray-600 mb-3">
                Yes, you can modify or cancel your booking from your profile dashboard.
                Free cancellation is available up to 24 hours before check-in.
              </p>

              <h3 className="font-semibold mb-1">Do you offer group or corporate stays?</h3>
              <p className="text-gray-600">
                Absolutely! StayElo offers exclusive rates for corporate and group bookings.
                Contact our support team for tailored packages.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Is StayElo available in all cities?</h3>
              <p className="text-gray-600 mb-3">
                We currently operate across major cities in Kerala and expanding to more destinations soon.
              </p>

              <h3 className="font-semibold mb-1">What payment methods are accepted?</h3>
              <p className="text-gray-600 mb-3">
                We accept UPI, net banking, debit/credit cards, and popular digital wallets through Razorpay.
              </p>

              <h3 className="font-semibold mb-1">Do you offer loyalty rewards?</h3>
              <p className="text-gray-600">
                Yes! Earn StayElo points on every booking and redeem them for future stays or discounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
