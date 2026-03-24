import style from "./ProductCard.module.css";
import star from "../../Assets/Icons/star.svg";

export default function ProductCard({ product, addToCart }) {
    // return <div>{product.title}</div>;
    // console.log(product);

    return (
        <div id="product">
            <article className={style.product}>
                <div className={style["product__image"]}>
                    <div
                        className={`${style["product__switch"]} ${style["image-switch"]}`}
                    >
                        {product.images.map((img, index) => {
                            return (
                                <div
                                    className={`${style["image-switch__item"]}`}
                                    key={index}
                                >
                                    <div
                                        className={`${style["image-switch__img"]}`}
                                    >
                                        <img src={img} alt="Картинка" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ul
                        className={`${style["product__image-pagination"]} ${style["image-pagination"]}`}
                        aria-hidden="true"
                    ></ul>
                </div>
                <h3 className={style["product__title"]}>
                    <p>{product.title}</p>
                </h3>
                <div className={style["product__props"]}>
                    <span className={style["product__rating"]}>
                        <img src={star} alt="star" />
                        <span>{product.rating}</span>
                    </span>
                    <span className={style["product__testimonials"]}>
                        <span>{product.reviews.length}</span> отзывов
                    </span>
                </div>
                <div className={style["product__info"]}>
                    <span className={style["product__term"]}>
                        Артикул: <span>{product.meta.barcode}</span>
                    </span>
                    <span className={style["product__available"]}>
                        В наличии: <span>{product.stock}</span> шт.
                    </span>
                </div>
                <div
                    className={`${style["product__price"]} ${style["product-price"]}`}
                >
                    <span className={style["product-price__current"]}>
                        <span>{product.discountPercentage}</span> ₽
                    </span>
                    <span className={style["product-price__old"]}>
                        <span>{product.price}</span> ₽
                    </span>
                </div>
                <button
                    className={style["product__btn"]}
                    onClick={() => addToCart(product)}
                >
                    Добавить в корзину
                </button>
            </article>
        </div>
    );
}
