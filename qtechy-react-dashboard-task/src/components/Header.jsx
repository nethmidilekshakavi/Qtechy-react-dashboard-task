import React from "react";

const Header = ({ title, imageUrl }) => {
    return (
        <header className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Header"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
            )}
            <div className="relative h-full flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
                    {title || "Your Company Name"}
                </h1>
            </div>
        </header>
    );
};

export default Header;
