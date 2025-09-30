import React from "react";

export const DeleteModal = ({ show, contact, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure?</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            If you delete this contact, the entire data will be
                            lost. Are you sure you want to delete{" "}
                            <strong>{contact?.name}</strong>?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Yes, delete it!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};