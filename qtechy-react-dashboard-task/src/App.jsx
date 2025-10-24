import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const App = () => {
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        links: [
            { label: "", url: "" },
            { label: "", url: "" },
            { label: "", url: "" },
        ],
        email: "",
        phone: "",
        address: "",
    });

    const [showPreview, setShowPreview] = useState(false);
    const [saved, setSaved] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("dashboardData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("dashboardData", JSON.stringify(formData));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        console.log("Saved data:", formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Toggle Preview Button */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                    <Eye size={20} />
                    {showPreview ? "Edit Mode" : "Preview Mode"}
                </button>
            </div>

            {/* Save Notification */}
            {saved && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    ✓ Changes saved successfully!
                </div>
            )}

            {showPreview ? (
                // Preview Mode
                <div>
                    <Header title={formData.title} imageUrl={formData.imageUrl} />
                    <Navbar links={formData.links} />
                    <div className="container mx-auto px-4 py-12">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                This is a preview of your website. Switch to Edit Mode to make changes.
                            </p>
                        </div>
                    </div>
                    <Footer email={formData.email} phone={formData.phone} address={formData.address} />
                </div>
            ) : (
                // Edit Mode
                <div className="container mx-auto px-4 py-8">
                    <Dashboard formData={formData} setFormData={setFormData} onSave={handleSave} />

                    {/* Live Preview Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Live Preview</h2>
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                            <Header title={formData.title} imageUrl={formData.imageUrl} />
                            <Navbar links={formData.links} />
                            <div className="p-8 text-center text-gray-600">
                                <p>Your content will appear here...</p>
                            </div>
                            <Footer email={formData.email} phone={formData.phone} address={formData.address} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;