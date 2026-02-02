function isTokenValid(decodedToken) {

    const expirationDateToken = new Date(decodedToken.exp * 1000);
    const dateTokenNow = new Date();
    console.log('Huidige datum:', dateTokenNow);
    console.log('Verlopen datum:', expirationDateToken);
    console.log(expirationDateToken > dateTokenNow);

    return expirationDateToken > dateTokenNow;
}

export default isTokenValid;