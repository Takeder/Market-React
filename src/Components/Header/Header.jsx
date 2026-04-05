import { Link, useNavigate } from "react-router-dom";
import style from "./Header.module.css";

export default function Header({ openCart, user }) {
    const navigate = useNavigate();
    function handleLogOut(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    }
    return (
        <header>
            <div className={style["header-actions"]}>
                {!user ? (
                    <Link to={"/login"}>Войти</Link>
                ) : (
                    <Link onClick={handleLogOut} to={"/"}>
                        Выйти
                    </Link>
                )}
                <button id="toggleButton" onClick={openCart}>
                    Корзина
                </button>
            </div>
            {user && (
                <div className={style["user-info"]}>
                    {/* Сюда вставится картинка через JS */}
                    <img
                        className={style["user-avatar"]}
                        src={user.image}
                        alt="Avatar"
                    />

                    <h2
                        className={style["username"]}
                    >{`${user.firstName} ${user.lastName}`}</h2>
                </div>
            )}
        </header>
    );
}
