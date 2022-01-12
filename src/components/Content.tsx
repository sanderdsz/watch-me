import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard'

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}

interface MovieProps {
  category: string;
  imdbID: string;
  Title: string;
  Poster: string;
  Rating: string;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 
        'comedy' | 
        'documentary' | 
        'drama' | 
        'horror' | 
        'family';
  title: string;
}

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
        {movies.map(movie => (
          <MovieCard 
            key ={movie.imdbID} 
            title={movie.Title} 
            poster={movie.Poster} 
            runtime={movie.Runtime} 
            rating={movie.Rating} 
          />
        ))}
        </div>
      </main>
    </div>
  )
}