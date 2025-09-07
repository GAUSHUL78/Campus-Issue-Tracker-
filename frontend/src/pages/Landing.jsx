import React from 'react';
import { Link } from 'react-router-dom';
import slietconnectImage from '../assets/slietconnect.jpeg';

const Landing = () => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen pt-28">
    {/* Hero Section with enhanced styling */}
    <div className="w-full flex flex-col md:flex-row items-start justify-start py-20 px-6">
      <div className="max-w-2xl">
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            🚀 Campus Innovation
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
          Make Your Campus<br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Better Together
          </span>
        </h1>
        <p className="text-xl mb-8 text-gray-700 leading-relaxed">
          A modern platform to report, track, and resolve campus issues with transparency and speed.
          Empowering students and staff to create a better environment together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </Link>
          <Link
            to="/login"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:ml-20 flex-1">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20"></div>
          <img
            src={slietconnectImage}
            alt="Campus Dashboard"
            className="relative w-full max-w-5xl h-[500px] object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            onError={e => e.target.style.display = 'none'}
          />
        </div>
      </div>
    </div>

    {/* Statistics Section */}
    <div className="py-20 bg-white w-full">
      <div className="px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Campus Impact in Numbers</h2>
          <p className="text-xl text-gray-600">See how we're making a difference across campus</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">400+</div>
              <div className="text-gray-700 text-lg">Total Problems Reported</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">350+</div>
              <div className="text-gray-700 text-lg">Problems Resolved</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-700 text-lg">Active Students</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">12hr</div>
              <div className="text-gray-700 text-lg">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-20 bg-white w-full">
      <div className="px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose Campus Issue Tracker?</h2>
          <p className="text-xl text-gray-600">Streamlined reporting and tracking for a better campus experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Reporting</h3>
            <p className="text-gray-700">Report issues quickly with our intuitive interface and photo uploads</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
            <p className="text-gray-700">Track the status of your reports in real-time with detailed updates</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Fast Resolution</h3>
            <p className="text-gray-700">Quick response times and efficient problem resolution by campus staff</p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 w-full">
      <div className="px-6">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Improve Your Campus?</h2>
        <p className="text-xl text-blue-100 mb-8">Join thousands of students and staff who are already making their campus better</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Start Reporting Now
          </Link>
          <Link
            to="/login"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 text-white w-full">
      <div className="px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Campus Issue Tracker</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students and staff to create a better campus environment through
              transparent and efficient issue reporting and resolution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/report-problem" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Report Issue
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@campusissuetracker.com
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Campus Address, City, State
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Campus Issue Tracker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Landing; 