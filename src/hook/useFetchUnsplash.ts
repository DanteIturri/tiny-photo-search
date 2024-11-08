import { useCallback, useEffect, useState, type FormEvent } from 'react';

// Define la interfaz para la imagen
interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  }
}

// Define el tipo del retorno del hook
type UseFetchImagesReturn = [
  Image[],
  boolean,
  (e: React.FormEvent<HTMLFormElement>) => void,
  () => void,
  (string: 'landscape' | 'portrait' | 'square' | '' | 'Todas') => void
];

export const useFetchImages = (): UseFetchImagesReturn => {
  const [images, setImages] = useState<Image[]>([]);
  const [input, setInput] = useState<string>('');
  const [orientation, setOrientation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Estado para la página actual
  const [hasMore, setHasMore] = useState<boolean>(true); // Estado para saber si hay más imágenes

  const fetchImages = useCallback(async () => {
    const key = 'client_id=CrXna0ff2HovF9SGDGufGknkot5tojdyFOINCLhmFN8';
    let route = `https://api.unsplash.com/photos?page=${page}&per_page=12&${key}`;

    if (input !== '') {
      route = `https://api.unsplash.com/search/photos?query=${encodeURI(input)}&${key}&per_page=12&page=${page}`;
      if (orientation !== '' && orientation !== 'Todas') {
        console.log('entro aquí');
        route += `&orientation=${orientation}`;
        console.log(route);
      }
    }

    setLoading(true);

    try {
      console.log('route', route);
      const res = await fetch(route);
      const data = await res.json();

      if (data.results) {
        console.log('entro a data.results');
        setImages(prevImages => [...prevImages, ...data.results]); // Agregar nuevas imágenes a las existentes
        setHasMore(data.results && data.results.length > 0);
      } else {
        console.log('entro aquí');
        // setImages([]);
        setImages(prevImages => [...prevImages, ...data]); // Para la respuesta de fotos
        setHasMore(data && data.length > 0);
      }

       // Verificar si hay más imágenes
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [input, page, orientation]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleOrientationChange = (string: string) => {
    setOrientation(string);
 // Reiniciar la página cuando cambia el filtro
    setImages([]);
    setPage(1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = (form.elements[0] as HTMLInputElement).value;
    setInput(text);
    setImages([]); // Limpiar las imágenes al buscar una nueva
    setPage(1); // Reiniciar la página a 1
  };

  // Función para cargar más imágenes
  const loadMoreImages = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return [images, loading, handleSubmit, loadMoreImages, handleOrientationChange];
};
