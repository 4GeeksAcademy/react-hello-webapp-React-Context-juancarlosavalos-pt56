import React, { useContext, useState, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (isEditing && store.currentContact) {
            setFormData({
                name: store.currentContact.name || "",
                email: store.currentContact.email || "",
                phone: store.currentContact.phone || "",
                address: store.currentContact.address || ""
            });
        }
    }, [isEditing, store.currentContact]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert("Please fill all fields");
            return;
        }

        let success;
        if (isEditing) {
            success = await actions.updateContact(id, formData);
        } else {
            success = await actions.createContact(formData);
        }

        if (success) {
            navigate("/");
        } else {
            alert("Error saving contact");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <h1 className="text-center mb-4">
                        {isEditing ? "Edit Contact" : "Add New Contact"}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Enter phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            {isEditing ? "Update Contact" : "Save Contact"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-link w-100"
                            onClick={() => navigate("/")}
                        >
                            for get back to contacts
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};