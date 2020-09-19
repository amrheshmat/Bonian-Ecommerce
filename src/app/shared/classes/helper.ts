
function addToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function addCartToLocalStorage(cart: any) {
    addToLocalStorage("cart", cart);
}

function getFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
}

function getCartFromLocalStorage(): any {
    return  getFromLocalStorage("cart");
}
