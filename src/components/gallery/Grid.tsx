import React, { useEffect, useState, type FC } from 'react';
import { useFetchImages } from '../../hook/useFetchUnsplash';
import  useInfiniteScroll  from '../../hook/useInfiniteScroll'
import { CSSTransition } from 'react-transition-group';

// Components
import { Card } from './Card';
import { Loading } from './Loading';
import { Form } from './Form';
import { Select } from './Select';
// Styles
import './styles/grid.css';

export const Grid: FC = () => {
  const [
    images,
    loading,
    handleSubmit,
    loadMoreImages,
    handleOrientationChange,
  ] = useFetchImages();

  const [searchValue, setSearchValue] = useState<string>('');
  useInfiniteScroll(loadMoreImages);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          width: '1300px',
          margin: '20px auto',
        }}
      >
        <Form handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
         <CSSTransition
          in={!!searchValue} // Activa la animación si hay texto en searchValue
          timeout={300}
          classNames="select"
          unmountOnExit // Desmonta el componente cuando no está visible
        >
          <Select
            handleOrientationChange={handleOrientationChange}
            options={['HORIZONTAL', 'VERTICAL']}
          />
        </CSSTransition>
      </div>
      <div className="grid-container">
        {images.map((img, index) => (
          <div key={index} className="grid-item">
            <Card
              url={img.urls.regular}
              description={img.alt_description}
              name={img.user.name}
              id={img.id}
              urlFull={img.urls.full}
            />
          </div>
        ))}
      </div>
      <div>{loading && <Loading />}</div>
    </>
  );
};
