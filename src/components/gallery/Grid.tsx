import React, { Suspense, useEffect, useRef, useState, type FC } from 'react';
import { useFetchImages } from '../../hook/useFetchUnsplash';
import  useInfiniteScroll  from '../../hook/useInfiniteScroll'
import { CSSTransition } from 'react-transition-group';

// Components
import { Card } from './Card';
import { Loading } from './Loading';
import { Form } from './Form';
import { Select } from './Select';
import { Skeleton } from './Skeleton';
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

    const selectRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          width: '90%',
          padding: '0 20px',
          margin: '20px auto',
        }}
      >
        <Form handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
         <CSSTransition
          in={!!searchValue} // Activa la animación si hay texto en searchValue
          timeout={300}
          classNames="select"
          unmountOnExit // Desmonta el componente cuando no está visible
          nodeRef={selectRef} // Referencia al nodo del DOM
        >
          <div ref={selectRef} style={{ width: '100%' }}>
            <Select
              handleOrientationChange={handleOrientationChange}
              options={['HORIZONTAL', 'VERTICAL']}
            />
          </div>
        </CSSTransition>
      </div>
      <div className="grid-container">
        {images.map((img, index) => (
          <div key={index} className="grid-item">
            <Suspense fallback={<Skeleton height="300px" />}>
              <Card
                url={img.urls.regular}
                description={img.alt_description}
                name={img.user.name}
                id={img.id}
                urlFull={img.urls.full}
              />
            </Suspense>
          </div>
        ))}
      </div>
      <div>{loading && <Loading />}</div>
    </>
  );
};
