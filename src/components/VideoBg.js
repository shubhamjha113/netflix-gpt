
import {  useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBg = ({movieId}) => {
  const trailerVideos = useSelector((store) => store.movies?.trailerVideos);
  useMovieTrailer(movieId);


  return (
    <div className='w-screen'>
         <iframe className='w-screen aspect-video' 
              src={`https://www.youtube.com/embed/${trailerVideos?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideos?.key}&controls=0&showinfo=0&rel=0`}

              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          >
          </iframe>
    </div>
  )
}

export default VideoBg
