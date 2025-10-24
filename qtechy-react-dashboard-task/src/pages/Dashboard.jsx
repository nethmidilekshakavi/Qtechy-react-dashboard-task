import React, { useState } from "react";
import {Edit3,Save,Upload,Mail,Phone,MapPin} from "lucide-react";

const Dashboard = ({ formData, setFormData, onSave }) => {
    const [imagePreview, setImagePreview] = useState(formData.imageUrl || "");
    const [uploading, setUploading] = useState(false);

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (name.startsWith("linkLabel") || name.startsWith("linkUrl")) {
            const newLinks = [...formData.links];
            if (name.startsWith("linkLabel")) {
                newLinks[index].label = value;
            } else {
                newLinks[index].url = value;
            }
            setFormData({ ...formData, links: newLinks });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview image before upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "ml_default"); // Replace with your preset

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/davhloffd/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await res.json();
            const newImageUrl = result.secure_url;

            setFormData({ ...formData, imageUrl: newImageUrl });
            setImagePreview(newImageUrl);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Edit3 className="text-blue-600" />
                    Dashboard
                </h2>
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            {/* Header Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Header Settings</h3>

                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Enter your company name or title"
                        className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2 text-gray-700">Header Image:</label>
                    <div className="flex flex-col gap-4">
                        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                            <Upload className="text-blue-600" />
                            <span className="text-gray-600">
                {uploading ? "Uploading..." : "Click to upload image"}
              </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={uploadImage}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>

                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                                <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Preview
                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navbar Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Navigation Links</h3>
                {formData.links.map((link, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-3 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 text-gray-600">
                                Link {i + 1} Label
                            </label>
                            <input
                                type="text"
                                placeholder={`e.g., Home, About, Contact`}
                                name={`linkLabel${i}`}
                                value={link.label}
                                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                                onChange={(e) => handleChange(e, i)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 text-gray-600">
                                Link {i + 1} URL
                            </label>
                            <input
                                type="text"
                                placeholder="https://example.com"
                                name={`linkUrl${i}`}
                                value={link.url}
                                className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                                onChange={(e) => handleChange(e, i)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Footer Information</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
                            <Mail size={18} className="text-orange-600" />
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="contact@example.com"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
                            <Phone size={18} className="text-orange-600" />
                            Phone:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            placeholder="+1 (555) 123-4567"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2">
                            <MapPin size={18} className="text-orange-600" />
                            Address:
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            placeholder="123 Main St, City, State 12345"
                            className="border-2 border-gray-300 p-3 w-full rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
