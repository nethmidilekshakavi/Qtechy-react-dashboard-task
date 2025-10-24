import React from "react";

const Footer = ({ email, phone, address }) => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
                    {email && (
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Mail className="text-blue-400" size={20} />
                            <a href={`mailto:${email}`} className="hover:text-blue-400 transition-colors">
                                {email}
                            </a>
                        </div>
                    )}
                    {phone && (
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Phone className="text-blue-400" size={20} />
                            <a href={`tel:${phone}`} className="hover:text-blue-400 transition-colors">
                                {phone}
                            </a>
                        </div>
                    )}
                    {address && (
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <MapPin className="text-blue-400" size={20} />
                            <span>{address}</span>
                        </div>
                    )}
                </div>
                <div className="text-center mt-6 pt-6 border-t border-gray-700 text-gray-400 text-sm">
                    © {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
