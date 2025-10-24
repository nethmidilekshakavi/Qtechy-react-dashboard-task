import React from "react";

const Header = ({ title, imageUrl }) => {
    return (
        <header className="bg-blue-100 flex flex-col items-center p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{title || "Default Title"}</h1>
            {imageUrl && (
                <img src={imageUrl} alt="Header" className="w-40 h-40 object-cover rounded-full" />
            )}
        </header>
    );
};

export default Header;
