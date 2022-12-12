import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import Header from '../Header/Header.js';
import {Footer} from '../Footer/Footer.js';
import {SendData} from './SendData';
import "./session_style.css";

export default function Session(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [seats, setSeats] = useState({});
    const [movie, setMovie] = useState({});
    const [status, setStatus] = useState(false);
    useEffect(() => {
        const getData = async() =>{
            try {
                const {data} = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`);
                setMovie(data);
            }catch (error) {
                alert("Ocorreu um error ao carregar os dados");
            }
        }
        getData();
    }, []);
    console.log(movie)
    
    return movie.seats? (
        <>
        <Header visible={true}/>
        <section className="purchase">
            <div className = "header">
                <ion-icon onClick={()=>{navigate(-1)}} name="chevron-back-circle"></ion-icon>
                {status?<h1 className="title">Selecione o(s) assento(s) desejado(s)</h1>:<h1 className="title">Sessão esgotada</h1>}
            {}
            </div>
            <section className="seats" data-test="seat">
                {        
                movie.seats.map(item => <Seat available={item.isAvailable}
                    number={item.name} 
                    id={item.id} 
                    status={(i)=>{if(i)setStatus(true)}} 
                    callback={(value, info, mode) => {mode? 
                    setSeats({...seats,[value]: {'value':value, 'id': info}}) :
                    setSeats({...seats,[value]: [delete [value]]});
                }

                } />
                )
                }
                <Div>
                    <Reference>
                        <Selected></Selected>
                        <p data-test="seat">
                            Selecionado
                        </p>
                    </Reference>
                    <Reference>
                        <Available></Available>
                        <p data-test="seat">
                            Disponível
                        </p>
                    </Reference>
                    <Reference>
                        <Unavailable></Unavailable>
                        <p data-test="seat">
                            Indisponível
                        </p>
                    </Reference>
                </Div>
                <div className="chekin">
                    <h1>Seus assentos:</h1>
                    <ul>
                        { seats?
                            Object.keys(seats).map(item=> <li>{seats[item].value}</li>):
                            <li>0</li>
                        }
                        
                    </ul>
                </div>
                <SendData data={seats} title={movie.movie.title} date={`${movie.day.date}  ${movie.name}`}/>
            </section>
            
        </section>
        <Footer poster={movie.movie.posterURL} title={movie.movie.title} date={`${movie.day.weekday} - ${movie.name}`} data-test="footer" />
        <Hiden>
        </Hiden>
        </>
    ):(
        <div className="loading">
            <div alt="Loading..."></div>
        </div>
    )
}

function Seat(props){
    const [selected, setSelected] = useState(false);
    const{ id, available, number, callback, status}= props;
    const classCss= `seat ${available? selected? "selected":"available": "unavailable"}`
    if(available) status(true);
    const seat = `${number<10? "0":""}${number}`
    return(
        <div className={classCss} onClick={()=>{
            if(!available) alert("Assento não disponivel");
            else{
            if(!selected){
            setSelected(true);
            callback(number,id, true);}
            else{
            callback(number,id, false)
            setSelected(false);
            }}
        }}>{seat}</div>
    )
}

// Alguns styled-components
const Div= styled.div `
    width: 100%;
    max-width: 350px;
    display: flex;
    justify-content: space-around;
`;

const Reference = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width:90px;
`;
const Selected=styled.div `
    border-radius: 50%;
    margin: 0 3.5px 18px 3.5px;
    border: 1px solid #45BDB0;
    background: #8DD7CF;
    width:26px;
    height:26px;
`;
const Available = styled.div `
    border-radius: 50%;
    margin: 0 3.5px 18px 3.5px;
    border: 1px solid #808F9D;
    background: #C3CFD9;
    width:26px;
    height:26px;
`;
const Unavailable = styled.div `
    border-radius: 50%;
    margin: 0 3.5px 18px 3.5px;
    border: 1px solid #F7C52B;
    background: #FBE192;
    width:26px;
    height:26px;
`;
const Hiden= styled.div `
display: none;
`;
