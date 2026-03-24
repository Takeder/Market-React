import ProductList from "../../UI/ProductList/ProductList";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Header from "../../Components/Header/Header";
import Cart from "../../Components/Cart/Cart";
import { api } from "../../api";

export default function Market() {
    const [products, setProducts] = useState([]);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        // Создаем асинхронную функцию внутри эффекта
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
                // У DummyJSON данные лежат в data.products
                setProducts(data.products);
            } catch (error) {
                console.error("Ошибка при загрузке товаров:", error);
            }
        };

        fetchProducts();
    }, []); // Пустой массив гарантирует вызов только при первом рендере
    //Добавление в корзину просто
    function addToCart(product) {
        const findedProduct = cartProducts.find(
            (item) => item.id === product.id,
        );
        if (!findedProduct) {
            setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
        }
        if (!isOpenCart) {
            openCart();
        }
    }

    // Новая функция для кнопок + и -
    //Увеличение и уменьшение товаров в корзине
    function changeQuantity(id, delta) {
        const targetProduct = cartProducts.find((item) => item.id === id);
        if (targetProduct && targetProduct.quantity === 1 && delta === -1) {
            // Удаляем этот товар из корзины, оставляя только те, чей id не совпадает
            setCartProducts(cartProducts.filter((item) => item.id !== id));
        } else {
            setCartProducts(
                cartProducts.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + delta };
                    } else {
                        return item;
                    }
                }),
            );
        }
    }

    function openCart() {
        setIsOpenCart((prev) => !prev);
    }

    return (
        <div>
            <Header openCart={openCart} />
            <Cart
                isOpenCart={isOpenCart}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                changeQuantity={changeQuantity}
            />
            <ProductList>
                {products.map((product) => {
                    return (
                        <ProductCard
                            product={product}
                            key={product.id}
                            addToCart={addToCart}
                        />
                    );
                })}
            </ProductList>
        </div>
    );
}
