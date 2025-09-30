const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            agendaSlug: "agenda_juancarlos_2025", // Cambia este nombre por uno único
            currentContact: null
        },
        actions: {
            createAgenda: async () => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}`,
                        {
                            method: "POST"
                        }
                    );
                    if (response.ok) {
                        console.log("Agenda creada exitosamente");
                        getActions().loadContacts();
                    }
                } catch (error) {
                    console.error("Error creando agenda:", error);
                }
            },

            loadContacts: async () => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`
                    );
                    
                    if (response.status === 404) {
                        await getActions().createAgenda();
                        return;
                    }
                    
                    const data = await response.json();
                    setStore({ contacts: data.contacts || [] });
                } catch (error) {
                    console.error("Error cargando contactos:", error);
                    setStore({ contacts: [] });
                }
            },

            createContact: async (contact) => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(contact)
                        }
                    );
                    
                    if (response.ok) {
                        await getActions().loadContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error creando contacto:", error);
                    return false;
                }
            },

            updateContact: async (contactId, contact) => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${contactId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(contact)
                        }
                    );
                    
                    if (response.ok) {
                        await getActions().loadContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error actualizando contacto:", error);
                    return false;
                }
            },

            deleteContact: async (contactId) => {
                const store = getStore();
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${contactId}`,
                        {
                            method: "DELETE"
                        }
                    );
                    
                    if (response.ok) {
                        await getActions().loadContacts();
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error("Error eliminando contacto:", error);
                    return false;
                }
            },

            setCurrentContact: (contact) => {
                setStore({ currentContact: contact });
            }
        }
    };
};

export default getState;