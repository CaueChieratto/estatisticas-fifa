import { FaFutbol } from "react-icons/fa";
import "./EmptyCareers.css";

export default function EmptyCareers(props) {
  return (
    <div className="empty-careers-container">
      <div className="containerEmptyCarrer">
        <FaFutbol className="empty-icon" />
        <h2>Nenhuma carreira encontrada</h2>
        <p>Comece uma carreira e acompanhe suas estatisticas.</p>
        <button onClick={props.onClick} className="new-career-btn">
          Nova Carreira
        </button>
      </div>
    </div>
  );
}
