import { Route, Routes } from "react-router-dom";
import Market from "../../Pages/Market/Market";
import Login from "../../Pages/Login/Login";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Market />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;

// useState - Хук создает состояния и позволяет его изменять
// useEffect - Хук перехватчик изменения состояний, который запускает функццию в ответ на изменения состояний указанных в [dependence]
// useMemo - Хук для оптимизации, который предотвращает ненужные перерасчеты при каждом рендере
// useCallback - Хук для оптимизации, который возвращает запомненную версию функции, которая изменяется только при изменении указанных в [dependence]
// useContext - Хук для хранения состояния компонента прпиложения с возможность доступа к этому состоянию в дочерних компонентах
// useRef - Хук создающий ссылку на dom-element

// REACT-ROUTER-DOM
// useNavigate - Хук перехода по роутам приложения
// useParams - позволяет получить параметры url страницы
// useLocation - позволяет получить url страницы
