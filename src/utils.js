export const getDatabase = (key) => {
    return new Promise((resolve, reject) => {
        const basketCart = JSON.parse(window.localStorage.getItem(key));
        resolve(basketCart);
    });
}

export const addDatabase = (key, stateVaribale) => {
    window.localStorage.setItem(key, JSON.stringify(stateVaribale));
}

export const stringPrice = (x=0) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}