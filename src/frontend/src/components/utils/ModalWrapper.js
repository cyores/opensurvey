import React from "react";
import ReactModal from "react-modal";

const desktopModelStyle = {
    content: {
        left: "12vw",
        right: "12vw",
        top: "10vh",
        bottom: "10vh",
        padding: "var(--space-xl)",
        borderRadius: "1rem",
        borderColor: "var(--color-shadow)",
        backgroundColor: "var(--color-bg)",
        boxShadow: "0 2px 32px var(--color-shadow)"
    },
    overlay: {
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)"
    }
};

const tabletModelStyle = {
    content: {
        left: "3vw",
        right: "3vw",
        top: "8vh",
        bottom: "5vh",
        padding: "var(--space-md)",
        borderRadius: "1rem",
        borderColor: "var(--color-shadow)",
        backgroundColor: "var(--color-bg)",
        boxShadow: "0 2px 32px var(--color-shadow)"
    },
    overlay: {
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)"
    }
};

const mobileModelStyle = {
    content: {
        left: "0",
        right: "0",
        top: "10vh",
        bottom: "0",
        padding: "var(--space-sm)",
        paddingTop: "var(--space-md)",
        borderRadius: "1rem",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        borderColor: "var(--color-shadow)",
        backgroundColor: "var(--color-bg)",
        boxShadow: "0 2px 32px var(--color-shadow)"
    },
    overlay: {
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)"
    }
};

ReactModal.setAppElement("#root");

export default function ModalWrapper(props) {
    let modalStyle = null;
    let width = window.innerWidth;
    if (width > 1024) modalStyle = desktopModelStyle;
    else if (width > 768) modalStyle = tabletModelStyle;
    else modalStyle = mobileModelStyle;
    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            style={modalStyle}
            closeTimeoutMS={250}
            onRequestClose={props.onRequestClose}
        >
            {props.children}
        </ReactModal>
    );
}
