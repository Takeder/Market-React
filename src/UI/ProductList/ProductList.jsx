import style from "./ProductList.module.css";

export default function ProductList({ children }) {
    return <div className={style.list}>{children}</div>;
}
