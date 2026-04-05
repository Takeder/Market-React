import { useState } from "react";
import style from "./OrderForm.module.css";
import X from "../../Assets/Icons/x.svg";
import { api } from "../../api";

export default function OrderForm({
    isOpen,
    onClose,
    totalSum,
    cartProducts,
    setCartProducts,
}) {
    // Собираем все поля в один объект
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Формируем объект для API (DummyJSON или твой бэкенд)
        const orderData = {
            userId: 1, // В реальном приложении берем из стейта user.id
            products: cartProducts.map((p) => ({
                id: p.id,
                quantity: p.quantity,
            })),
            customerInfo: formData,
            total: totalSum,
        };

        try {
            const response = await api.createOrder(orderData);
            if (response.ok) {
                setCartProducts([]);
                onClose(); // Закрываем модалку после успеха
                alert(`Заказ на сумму ${totalSum}р. успешно оформлен!`);
            } else {
                throw new Error("Ошибка создания заказа");
            }
        } catch (error) {
            alert(error.message);
            console.error("Ошибка при отправке товаров:", error);
        }
    };

    if (!isOpen) return null; // Если модалка закрыта, ничего не рендерим

    return (
        <section className={style.overLay} onClick={onClose}>
            {/* stopPropagation, чтобы окно не закрывалось при клике на саму форму */}
            <form
                className={style.overLay__order}
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={style.overLay__order__title}>
                    Оформление заказа
                </h2>

                <button
                    type="button"
                    className={style.overLay__btnClose}
                    onClick={onClose}
                >
                    <img src={X} alt="Закрыть" />
                </button>

                <div className={style.formFields}>
                    <label className={style.overLay__order__label}>
                        Фамилия
                        <input
                            className={style.overLay__order__input}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Иванов"
                            required
                        />
                    </label>

                    <label className={style.overLay__order__label}>
                        Имя
                        <input
                            className={style.overLay__order__input}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Иван"
                            required
                        />
                    </label>

                    <label className={style.overLay__order__label}>
                        Номер телефона
                        <input
                            className={style.overLay__order__input}
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+7 (999) 000-00-00"
                            required
                        />
                    </label>

                    <label className={style.overLay__order__label}>
                        E-mail
                        <input
                            className={style.overLay__order__input}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            required
                        />
                    </label>

                    <label className={style.overLay__order__label}>
                        Адрес
                        <input
                            className={style.overLay__order__input}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Город, улица, дом"
                            required
                        />
                    </label>
                </div>

                <div className={style.orderSummary}>
                    <p>
                        Итого к оплате:{" "}
                        <strong>{totalSum.toLocaleString()} р.</strong>
                    </p>
                    <button type="submit" className={style["submit-btn"]}>
                        Подтвердить заказ
                    </button>
                </div>
            </form>
        </section>
    );
}
