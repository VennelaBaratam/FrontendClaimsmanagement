import React, { useState, useEffect } from "react";
import api from "../services/api";

const PolicyholderForm = ({ setPolicyholders }) => {
    const [formData, setFormData] = useState({
        policyholderId: "", // Keep policyholderId instead of _id
        name: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.policyholderId) {
                // Update an existing policyholder
                await api.put(`/policyholders/${formData.policyholderId}`, formData);
                alert("Policyholder updated successfully!");
            } else {
                // Create a new policyholder
                const response = await api.post("/policyholders", formData);
                alert("Policyholder added successfully!");
                setPolicyholders(prev => [...prev, response.data]); // Update list
            }
            setFormData({ policyholderId: "", name: "", address: "" }); // Reset form
        } catch (error) {
            console.error("Error processing policyholder:", error);
            alert(error.response?.data?.message || "Failed to process policyholder.");
        }
    };

    return (
        <div>
            <h2>{formData.policyholderId ? "Update Policyholder" : "Add Policyholder"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="policyholderId"
                    value={formData.policyholderId}
                    onChange={handleChange}
                    placeholder="Policyholder ID"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                />
                <button type="submit">{formData.policyholderId ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
};

export default PolicyholderForm;
