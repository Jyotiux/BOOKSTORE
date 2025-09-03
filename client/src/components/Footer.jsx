import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 text-center text-sm md:text-base">
      <p>© {new Date().getFullYear()} Book Store. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
