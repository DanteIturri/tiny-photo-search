import React from 'react';

// Styles
import './styles/card.css';

export const Card = ({ url, description, name , id, urlFull }: { url: string; description: string; name: string; id: string; urlFull: string }) => {
  const downloadImage = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  return (
    <>
      <img
        src={url}
        alt={description ? description : ' no description'}
      />
      <div className="grid-content">
        <h4>{name ? name : ' no user name'}</h4>
        <button className="download-btn" onClick={() => downloadImage(urlFull, `${id}.jpg`)}>
              Descargar
            </button>
      </div>
    </>
  );
};
