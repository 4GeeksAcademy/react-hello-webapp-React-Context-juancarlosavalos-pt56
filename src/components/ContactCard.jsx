import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEdit = () => {
        actions.setCurrentContact(contact);
        navigate(`/edit/${contact.id}`);
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center p-3">
                    <img
                        src={`https://ui-avatars.com/api/?name=${contact.name}&size=150&background=random`}
                        className="img-fluid rounded-circle"
                        alt={contact.name}
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text mb-1">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {contact.address}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fas fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex justify-content-center align-items-start p-3">
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={handleEdit}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(contact)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};