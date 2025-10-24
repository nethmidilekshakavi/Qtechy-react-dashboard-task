import React from "react";

const Navbar = ({ links }) => {
    return (
        <nav className="flex justify-center bg-gray-200 p-4 gap-6">
            {links.map((link, index) => (
                <a key={index} href={link.url} className="text-blue-600 hover:text-blue-800 font-medium">
                    {link.label || `Link ${index + 1}`}
                </a>
            ))}
        </nav>
    );
};

export default Navbar;
