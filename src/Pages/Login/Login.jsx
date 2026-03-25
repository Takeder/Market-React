import { useState } from "react";
import style from "./Login.module.css";

export default function Login() {
    const [value, setValue] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(value);
    }

    function handleChange(e) {
        setValue({ ...value, [e.target.name]: e.target.value });
    }
    return (
        <section className={style.overLay} id="loginForm">
            <form onSubmit={handleSubmit} className={style.loginForm}>
                <h2 className={style.loginFormTitle}>Вход</h2>
                <label htmlFor="loginName">Login:</label>
                <input
                    value={value.username}
                    onChange={handleChange}
                    type="text"
                    id="loginName"
                    className={style.formInput}
                    name="username"
                />
                <label htmlFor="loginPassword">Password:</label>
                <input
                    value={value.password}
                    onChange={handleChange}
                    type="password"
                    id="loginPassword"
                    className={style.formInput}
                    name="password"
                />
                <button className={style["submit-btn"]}>Подтвердить</button>
            </form>
        </section>
    );
}
