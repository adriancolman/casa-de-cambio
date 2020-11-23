/// <reference types="jquery"/>

export async function callingLatestExchanges() {
    try {
        const respuesta = await fetch("https://api.exchangeratesapi.io/latest");
        const respuestaJson = await respuesta.json();
        return respuestaJson
    } catch (error) {
        return console.error("error:", error);
    }
}

export async  function getUserSelectedExchanges(base, date) {
    try{
        const respuesta = await fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`);
    const respuestaJson = await respuesta.json();
    return respuestaJson;
        
    }
    catch (error) {
        return console.error("error:", error);
    }
}