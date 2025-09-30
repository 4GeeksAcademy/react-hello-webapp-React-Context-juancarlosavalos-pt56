import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { DeleteModal } from "../components/DeleteModal.jsx";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        actions.loadContacts();
    }, []);

    const handleDeleteClick = (contact) => {
        setContactToDelete(contact);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (contactToDelete) {
            const success = await actions.deleteContact(contactToDelete.id);
            if (success) {
                console.log("Contacto eliminado exitosamente");
            }
        }
        setShowModal(false);
        setContactToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setContactToDelete(null);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {store.contacts.length === 0 ? (
                        <div className="alert alert-info text-center mt-4" role="alert">
                            <h4>No contacts yet!</h4>
                            <p>Add your first contact using the button above.</p>
                        </div>
                    ) : (
                        store.contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onDelete={handleDeleteClick}
                            />
                        ))
                    )}
                </div>
            </div>
            
            <DeleteModal
                show={showModal}
                contact={contactToDelete}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};