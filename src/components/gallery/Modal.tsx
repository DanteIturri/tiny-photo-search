import React, { useEffect, useState } from 'react'; 
import { Loading } from './Loading';
import { downloadImage } from '../../utils/downloads';

type ModalProps = {
  imageUrl: string | null;
  imageFullUrl?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

import './styles/modal.css';
export const Modal = ({ imageUrl, imageFullUrl, isOpen, onClose }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reiniciar el estado de carga cuando se abre el modal
      setIsLoading(true);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (imageFullUrl) {
      // Extraer un nombre de archivo desde la URL o usar uno genérico
      const fileName = imageFullUrl.split('/').pop() || 'imagen-descargada.jpg';
      downloadImage(imageFullUrl, fileName);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          {isLoading && <Loading />}
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Modal content" 
              onLoad={handleImageLoad}
              onClick={handleDownload}
              className={isLoading ? 'hidden' : ''}
              title="Haz clic para descargar la imagen"
            />
          )}
        </div>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
