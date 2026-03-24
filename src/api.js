class Api {
    async getProducts() {
        const response = await fetch("https://dummyjson.com/products");
        return await response.json();
    }
    async createOrder(orderBody) {
        const response = await fetch("https://dummyjson.com/carts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderBody),
        });
        return response;
    }
    async login(body) {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...body, expiresInMins: 1 }),
        });
        return response;
    }
    async checkToken() {
        //Проверка AccessToken
        const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Передаем токен в заголовке
            },
        });
        if (response.ok) {
            return response;
        } else {
            return this.refresh(this.checkToken);
        }
    }
    async refresh(callback) {
        // принимаем refreshToken
        const response = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                refreshToken: localStorage.getItem("refreshToken"),
                expiresInMins: 1,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            return await callback();
        } else {
            return response;
        }
    }
}

export const api = new Api();
