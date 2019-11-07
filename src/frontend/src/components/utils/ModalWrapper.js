import React from "react";
import ReactModal from "react-modal";

const modelStyle = {
    content: {
        left: "12vw",
        right: "12vw",
        top: "10vh",
        bottom: "10vh",
        padding: "var(--space-xl)",
        borderRadius: "1rem",
        borderColor: "var(--color-primary)",
        backgroundColor: "var(--color-bg)",
        boxShadow: "0 2px 32px var(--color-primary)"
    },
    overlay: {
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)"
    }
};

ReactModal.setAppElement("#root");

export default function ModalWrapper(props) {
    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            style={modelStyle}
            closeTimeoutMS={250}
            onRequestClose={props.onRequestClose}
        >
            {props.children}
        </ReactModal>
    );
}
