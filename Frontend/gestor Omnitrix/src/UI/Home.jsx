import {useNavigate} from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <video autoPlay loop muted className="background-video">
                <source src="/omnitrx-home.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="overlay"></div>
            <div className="home-text">
                <h1>
                    <span className="full-text">GESTOR<br/>ALIEN<br/>OMNITRIX</span>
                    <span className="short-text">G<br/>A<br/>O</span>
                </h1>
            </div>
            <button className="home-button" onClick={() => navigate("/login")}>
                <span className="button-text">Comienza ahora!</span>
                <span className="material-symbols-outlined"> login</span>
            </button>
        </div>
    );
}

export default Home;