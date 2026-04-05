import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Для перехода между страницами
import { api } from "../../api";
import style from "./Login.module.css";

export default function Login() {
    const [value, setValue] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        // console.log(value);

        try {
            const response = await api.login(value);

            if (response.ok) {
                const data = await response.json();
                // Записываем токены в хранилище
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                // Переходим на главную
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Ошибка авторизации");
            }
        } catch (err) {
            setError("Проблема с сетью или сервером");
        }
    }

    function handleChange(e) {
        setValue({ ...value, [e.target.name]: e.target.value });
    }
    return (
        <section className={style.overLay} id="loginForm">
            <form onSubmit={handleSubmit} className={style.loginForm}>
                <h2 className={style.loginFormTitle}>Вход</h2>
                {error && (
                    <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
                )}
                <label htmlFor="loginName">Login:</label>
                <input
                    value={value.username}
                    onChange={handleChange}
                    type="text"
                    id="loginName"
                    className={style.formInput}
                    name="username"
                    required
                />
                <label htmlFor="loginPassword">Password:</label>
                <input
                    value={value.password}
                    onChange={handleChange}
                    type="password"
                    id="loginPassword"
                    className={style.formInput}
                    name="password"
                    required
                />
                <button className={style["submit-btn"]}>Подтвердить</button>
            </form>
        </section>
    );
}
