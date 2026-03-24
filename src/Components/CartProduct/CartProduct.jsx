import style from "./CartProduct.module.css";
import X from "../../Assets/Icons/x.svg";

export default function CartProduct({
    product,
    removeProduct,
    changeQuantity,
}) {
    // console.log(product);

    return (
        <div id="cart-product">
            <div className={style["cart-product"]}>
                <button
                    className={style["cart-product__btn-del"]}
                    onClick={() => removeProduct(product.id)}
                >
                    <img src={X} alt="Удалить" />
                </button>
                <p className={style["cart-product__title"]}>{product.title}</p>
                <div className={style["cart-products__count-container"]}>
                    {/* Вызываем changeQuantity с дельтой -1 */}
                    <button
                        onClick={() => changeQuantity(product.id, -1)}
                        className={style["decrement"]}
                    >
                        -
                    </button>
                    <span>{product.quantity || 1}</span>
                    {/* Вызываем changeQuantity с дельтой +1 */}
                    <button
                        onClick={() => changeQuantity(product.id, 1)}
                        className={style["increment"]}
                    >
                        +
                    </button>
                </div>
                <p className={style["cart-product__price"]}>
                    Цена:{" "}
                    <span>
                        {(
                            product.discountPercentage * (product.quantity || 1)
                        ).toFixed(2)}
                    </span>
                    р.
                </p>
            </div>
        </div>
    );
}
