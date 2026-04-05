import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

import Header from "../../Components/Header/Header";
import Cart from "../../Components/Cart/Cart";
import ProductList from "../../UI/ProductList/ProductList";
import ProductCard from "../../Components/ProductCard/ProductCard";
import OrderForm from "../../Components/OrderForm/OrderForm";

export default function Market() {
    const navigate = useNavigate();

    // Состояние данных
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    // Состояние модалок
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

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

    const auth = async () => {
        try {
            const response = await api.checkToken();
            if (!response.ok) throw new Error();
            const data = await response.json();

            setUser(data);
        } catch (error) {
            navigate("/login");
            console.error("Ошибка авторизации:", error);
        }
    };

    useEffect(() => {
        auth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Пустой массив гарантирует вызов только при первом рендере

    useEffect(() => {
        if (user) fetchProducts();
    }, [user]);

    // Расчет итоговой суммы (вынесен сюда для передачи в OrderForm)
    const totalSum = useMemo(() => {
        return cartProducts
            .reduce((sum, item) => {
                // Используем цену (price). Если нужно со скидкой — добавьте расчет.
                return sum + item.discountPercentage * (item.quantity || 1);
            }, 0)
            .toFixed(2);
    }, [cartProducts]);

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

    // 5. Переход к оформлению
    const handleCheckout = () => {
        setIsOpenCart(false);
        setIsOrderFormOpen(true);
    };

    return (
        <div>
            <Header user={user} openCart={openCart} />
            <Cart
                isOpenCart={isOpenCart}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                changeQuantity={changeQuantity}
                onCheckout={handleCheckout} // Проп для кнопки "Оформить"
            />
            <OrderForm
                isOpen={isOrderFormOpen}
                onClose={() => setIsOrderFormOpen(false)}
                totalSum={totalSum} // Передай сюда сумму, которую мы считали в Cart (или вынеси расчет в Market)
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
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
