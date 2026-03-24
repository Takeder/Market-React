import { Link } from "react-router-dom";
import style from "./Header.module.css";

export default function Header({ openCart }) {
    return (
        <header>
            <div className={style["user-info"]}>
                {/* Сюда вставится картинка через JS */}
                <img className={style["user-avatar"]} alt="Avatar" />
                <h2 className={style["username"]}>User</h2>
            </div>
            <div className={style["header-actions"]}>
                <Link to={"/login"} id="profileBtnOut">
                    Войти
                </Link>
                <button id="toggleButton" onClick={openCart}>
                    Корзина
                </button>
            </div>
        </header>
    );
}
