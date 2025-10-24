import React from "react";

const Navbar = ({ links }) => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-center space-x-8 py-4">
                    {links.map((link, i) => (
                        link.label && (
                            <a
                                key={i}
                                href={link.url || "#"}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <Link2 size={16} />
                                {link.label}
                            </a>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
