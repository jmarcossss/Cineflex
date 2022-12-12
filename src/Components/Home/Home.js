import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './home_style.css';

export default function Home(){
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const fetchMovies = async() =>{
            try {
                const {data} = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies`);
                setMovie(data);
            }catch (error) {
                alert("Ocorreu um error ao carregar os dados");
            }
        }
        fetchMovies();
    }, []);
    console.log(movie)
    return movie.length > 0?(
        <section className='catalog'>
            <h1 className='title'>Selecione o filme</h1>
            <div className="movies" data-test="movie">
                {movie.map(item=><Movie poster={item.posterURL} id = {item.id} alt = {item.title}/>)}
            </div>
        </section>
    ):(
        <div className="loading">
            <div alt="Loading..."></div>
        </div>
    )
}

function Movie(props){
    const {poster, id, alt} = props;
    const link = `/movie/${id}`
    return(
        <Link to= {link}>
            <div className="movie">
                <img src={poster} alt={alt} className="poster" />       
            </div>
        </Link>
    )
}