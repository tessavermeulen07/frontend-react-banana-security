function isTokenValid(decodedToken) {
    // VUL DIT ZELF NOG IN!
    // checken of de expiration date (epoch timestamp) in de toekomst ligt
    const expirationDateToken = new Date(decodedToken.exp * 1000);
    const dateTokenNow = new Date();
    console.log('Huidige datum:', dateTokenNow);
    console.log('Verlopen datum:', expirationDateToken);
    console.log(expirationDateToken > dateTokenNow);
    // check vooral de cursus JavaScript Basics weer eens om te zien hoe je daarmee rekent!
    // retourneren we true of false op basis van die berekening
    return expirationDateToken > dateTokenNow;
}

export default isTokenValid;