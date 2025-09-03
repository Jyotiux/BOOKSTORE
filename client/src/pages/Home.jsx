import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const parallaxSections = [
    {
      id: 1,
      text: "Welcome to BookStore",
      subtext: "Discover your next favorite book.",
      image: "../images/hero1.jpg",
    },
    {
      id: 2,
      text: "Curated Collections",
      subtext: "Hand-picked books for every reader.",
      image: "../images/hero2.jpg",
    },
    {
      id: 3,
      text: "Read Anywhere",
      subtext: "From paperbacks to eBooks — we’ve got it all.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {parallaxSections.map((section, index) => {
        const isFirst = index === 0;

        return (
          <div key={section.id} className="relative">
            {/* Background Image */}
            <div
              className="h-[100vh] bg-fixed bg-center bg-cover flex items-center justify-center text-white relative"
              style={{
                backgroundImage: `url('${section.image}')`,
              }}
              onMouseEnter={() => isFirst && setIsHovered(true)}
              onMouseLeave={() => isFirst && setIsHovered(false)}
            >
              {/* Gradient Overlay */}
              {isFirst && (
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in z-10 ${
                    isHovered ? "opacity-80" : "opacity-50"
                  }`}
                />
              )}
              {!isFirst && (
                <div className="absolute inset-0 bg-black opacity-50 z-10" />
              )}

              {/* Text Content */}
              <div
                className={`relative z-20 max-w-3xl px-6 transition-all duration-700 ease-in
                ${index % 2 === 0 ? "text-left ml-auto" : "text-right mr-auto"}
                ${
                  isFirst
                    ? isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-12"
                    : "opacity-100 translate-x-0"
                }
              `}
              >
                <h1 className="text-4xl md:text-5xl font-bold">{section.text}</h1>
                <p className="mt-4 text-lg md:text-xl">{section.subtext}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-1 bg-black" />
          </div>
        );
      })}

      {/* Footer */}
      <div className="p-10 text-center bg-white">
        <h2 className="text-2xl font-semibold">
          Explore our collection and enjoy reading
        </h2>
      </div>
    </div>
  );
}

export default Home;
