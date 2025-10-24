import React from "react";

const Footer = ({ email, phone, address }) => {
    return (
        <footer className="bg-gray-100 p-4 text-center mt-10 rounded-lg shadow-md">
            <p>Email: {email || "example@gmail.com"}</p>
            <p>Phone: {phone || "071 234 5678"}</p>
            <p>Address: {address || "Colombo, Sri Lanka"}</p>
        </footer>
    );
};

export default Footer;
