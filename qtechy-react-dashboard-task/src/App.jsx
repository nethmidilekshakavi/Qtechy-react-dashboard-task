import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
    const [content, setContent] = useState({
        title: "Welcome to My Dashboard",
        imageUrl: "",
        links: [
            { label: "Home", url: "#" },
            { label: "About", url: "#" },
            { label: "Contact", url: "#" },
        ],
        email: "example@gmail.com",
        phone: "0712345678",
        address: "Colombo, Sri Lanka",
    });

    return (
        <div className="p-4">
            <Header title={content.title} imageUrl={content.imageUrl} />
            <Navbar links={content.links} />
            <Dashboard onUpdate={setContent} />
            <Footer email={content.email} phone={content.phone} address={content.address} />
        </div>
    );
}

export default App;
