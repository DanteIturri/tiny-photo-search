import React from 'react';

import { downloadImage } from '../../utils/downloads';

// Styles
import './styles/card.css';

export const Card = ({ url, description, name , id, urlFull }: { url: string; description: string; name: string; id: string; urlFull: string }) => {
  
  return (
    <>
      <img
        src={url}
        alt={description ? description : ' no description'}
      />
      <div className="grid-content">
        <h4>{name ? name : ' no user name'}</h4>
        <button className="download-btn" onClick={() => downloadImage(urlFull, id)}>
              Descargar
        </button>
      </div>
    </>
  );
};
