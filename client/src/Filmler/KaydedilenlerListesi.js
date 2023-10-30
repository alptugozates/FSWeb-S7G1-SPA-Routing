import React from 'react';
import { Link, useHistory } from 'react-router-dom';



export default function KaydedilenlerListesi(props) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map(movie => (
        <Link to={`/filmler/${movie.id}`}>
          <span className="saved-movie">{movie.title}</span>
        </Link>

      ))}
      <div onClick={handleClick} className="home-button">Anasayfa</div>
    </div>
  );
}
