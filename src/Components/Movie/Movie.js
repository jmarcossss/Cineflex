import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Header/Header.js';
import {Footer} from '../Footer/Footer.js';
import "./movie_style.css"

export default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const getData = async() =>{
            try {
                const {data} = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`);
                setMovie(data);
            }
            catch (error) {
                alert("Ocorreu um error ao carregar os dados");
            }
        }
        getData();
    }, []);

    console.log("sessão", movie.posterURL);
    return movie.days?(
        <>
            <main>
                <Header visible={true}/>
                <section className="sessions">
                    <h1 className="title">Selecione o horário</h1>
                    {movie.days.map(item=>
                        <Session date= {item}
                        time={item.showtimes}/>
                    ) }
                </section>
            </main>
            <Footer poster={movie.posterURL} title={movie.title} />
        </>
    ):(<div className="loading">
    <div> alt="Loading..." </div>

</div>)
}

function Session(props){
    const {date, time} = props
    const day = `${date.weekday} - ${date.date}`
    return(
        <div className="session" data-test="movie-day">
            <h1 className="date">{day}</h1>
            <div className="time" data-test="showtime">
                {time.map(item=>
                    <AvailableDates data={item} />
                )}
            </div>
        </div>
    )
}

function AvailableDates(props){
    const {data} = props;
    const link = `/session/${data.id}`
    return(
        <Link to= {link}>
            <button>{data.name}</button>
        </Link>
    )
}