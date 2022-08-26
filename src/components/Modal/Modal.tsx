import React, { FC } from 'react'
import styles from "./Modal.module.scss";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ onClose, children }) => (
    <div className={styles.overlay}>
        <div className={styles.overlay_inner}>

            <button className={styles.close} onClick={onClose}>
                <i className="fas fa-times"/>
            </button>

            <div className={styles.inner_box}>
                {children}
            </div>
        </div>
    </div>
)

export default React.memo(Modal)

// <Modal>
//     <EditContact /> // <--- Children
// </Modal>