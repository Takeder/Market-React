import { useMemo } from "react";
import CartProduct from "../CartProduct/CartProduct";
import style from "./Cart.module.css";

export default function Cart({
    isOpenCart,
    cartProducts,
    setCartProducts,
    changeQuantity,
    onCheckout, // Новый проп для открытия формы заказа
}) {
    // Пересчитываем сумму с учетом количества каждого товара
    const totalSum = useMemo(() => {
        return cartProducts.reduce((sum, item) => {
            // Умножаем цену на количество (если поля нет, берем 1)
            return sum + item.discountPercentage * (item.quantity || 1);
        }, 0);
    }, [cartProducts]); // Массив зависимостей — пересчет при любом изменении корзины

    function removeProduct(productId) {
        setCartProducts(
            cartProducts.filter((item) => {
                return item.id !== productId;
            }),
        );
    }

    // Если корзина пуста, показываем заглушку вместо списка
    const isEmpty = cartProducts.length === 0;

    return (
        <section
            className={`${style.cart} ${isOpenCart && style["cart-visible"]}`}
        >
            <div className={style["cart__products"]}>
                {isEmpty ? (
                    <p className={style["cart__empty-msg"]}>
                        Корзина пока пуста
                    </p>
                ) : (
                    cartProducts.map((product) => (
                        <CartProduct
                            product={product}
                            key={product.id}
                            removeProduct={removeProduct}
                            changeQuantity={changeQuantity}
                        />
                    ))
                )}
            </div>
            <div className={style["cart__actions"]}>
                <p className={style["cart__actions__price"]}>
                    Сумма всей корзины: <span>{totalSum.toLocaleString()}</span>{" "}
                    р.
                </p>

                <button
                    className={style["cart-order"]}
                    onClick={onCheckout}
                    disabled={isEmpty}
                >
                    Оформить заказ
                </button>

                <button
                    onClick={() => setCartProducts([])}
                    className={style["clean-cart"]}
                    disabled={isEmpty}
                >
                    Очистить корзину
                </button>
            </div>
        </section>
    );
}
