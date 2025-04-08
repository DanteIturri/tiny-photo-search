import React, { useState } from 'react';

import { downloadImage } from '../../utils/downloads';
import { Modal } from './Modal';

// Styles
import './styles/card.css';

export const Card = ({ url, description, name , id, urlFull }: { url: string; description: string; name: string; id: string; urlFull: string }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  return (
    <>
      <div className="card-image-container" onClick={handleOpenModal}>
        {url ? (
          <img
            src={url || undefined}
            alt={description ? description : ' no description'}
            className="card-image"
          />
        ) : (
          <div className="placeholder-image">No image available</div>
        )}
      </div>
      <div className="grid-content">
        <h4>{name ? name : ' no user name'}</h4>
        <button 
          className="download-btn" 
          onClick={() => downloadImage(urlFull, id)}
          disabled={!urlFull}
        >
          Descargar
        </button>
      </div>

      <Modal 
        imageUrl={ url || null} 
        imageFullUrl={urlFull || null} 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};
