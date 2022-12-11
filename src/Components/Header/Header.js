import { useNavigate } from "react-router-dom";
import "./header_style.css"

export default function Header(props){
    const{visible} = props;
    const navigate = useNavigate();
    return (
        <header>
            {visible? <ion-icon onClick={()=>{navigate(-1)}} name="chevron-back-circle"></ion-icon>:<></>}
            <h1>CINEFLEX</h1>
        </header>
    );
}
