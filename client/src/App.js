import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = movie => {
    const savedArr = saved;
    savedArr.filter((item) => item.id === movie.id).length === 0 &&
      savedArr.push(movie);
    setSaved([...savedArr]);
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
        <Route exact path="/">
          <FilmListesi movies={movieList} />
        </Route>
        <Route path="/filmler/:id">
          <Film
            KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
            saved={saved}
          />
        </Route>
      </Switch>
    </div>
  );
}
