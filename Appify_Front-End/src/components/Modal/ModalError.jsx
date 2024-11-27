import React from 'react';
import './ModalError.css'; // Asegúrate de que este archivo contiene los estilos adecuados
import { PiWarningFill } from "react-icons/pi";
const ModalError = ({ errorMessage, onClose, onRetry, onCancel }) => {
    if (!errorMessage) return null; // No renderiza nada si no hay mensaje de error

    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-content">
                    <div>
                        <PiWarningFill size={64} color="#CD012D" />
                    </div>
                    <p>{errorMessage}</p>
                    <div>
                        <button onClick={onCancel} className='modal-cancel'>Cancelar</button>
                        <button onClick={onRetry} className='modal-return'>Volver a intentar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalError;
