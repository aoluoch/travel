import React from "react";
import { Link } from "react-router-dom";
import { Compass, Github, Twitter, Instagram, Facebook } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Logo and description */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <Compass className="h-6 w-6 text-primary-500" />
                <span className="text-lg font-bold text-gray-900">
                  Travel Buddy
                </span>
              </Link>
              <p className="text-sm text-gray-600">
                Connecting travelers with compatible companions for
                unforgettable adventures around the world.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Explore</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/trips"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Find Trips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/matches"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Travel Companions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accommodations"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Accommodations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Destinations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Travel Buddy. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2 sm:mt-0">
              Made with ❤️ for travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
