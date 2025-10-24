import React, { useState } from "react";
import axios from "axios";

const Dashboard = ({ onUpdate }) => {
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

    // Handle text input changes
    const handleChange = (e, index, field) => {
        const { name, value } = e.target;
        if (name.startsWith("linkLabel") || name.startsWith("linkUrl")) {
            const newLinks = [...formData.links];
            if (name.startsWith("linkLabel")) newLinks[index].label = value;
            else newLinks[index].url = value;
            setFormData({ ...formData, links: newLinks });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        onUpdate(formData);
    };

    // Upload image to Cloudinary
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "YOUR_UNSIGNED_PRESET");

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/davhloffd/image/upload`,
            data
        );
        setFormData({ ...formData, imageUrl: res.data.secure_url });
        onUpdate({ ...formData, imageUrl: res.data.secure_url });
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2>

            {/* Header */}
            <div>
                <label className="block font-semibold mb-1">Header Title:</label>
                <input type="text" name="title" className="border p-2 w-full rounded" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="block font-semibold mb-1">Upload Header Image:</label>
                <input type="file" onChange={uploadImage} />
            </div>

            {/* Navbar */}
            <div className="mt-6">
                <h3 className="font-bold mb-2">Navbar Links</h3>
                {formData.links.map((link, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder={`Label ${i + 1}`}
                            name={`linkLabel${i}`}
                            className="border p-2 flex-1 rounded"
                            onChange={(e) => handleChange(e, i, "label")}
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            name={`linkUrl${i}`}
                            className="border p-2 flex-1 rounded"
                            onChange={(e) => handleChange(e, i, "url")}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6">
                <h3 className="font-bold mb-2">Footer</h3>
                <input type="text" name="email" placeholder="Email" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" className="border p-2 w-full mb-2 rounded" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" className="border p-2 w-full rounded" onChange={handleChange} />
            </div>
        </div>
    );
};

export default Dashboard;
