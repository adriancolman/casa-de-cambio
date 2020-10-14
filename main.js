

/// <reference types="jquery"/>

const $select = document.querySelector("#base-select");
const $buttonBaseDate = document.querySelector("#button-base");
const $inputDate = document.querySelector("#date-selection");
const $table = document.querySelector(".table-exchange");
const $subTitle = document.querySelector(".sub-title");
const $menuIcon = document.querySelector("#menu-icon");
const $arrowIcon = document.querySelector("#arrow-icon");
const $divErrorDate = document.querySelector(".error-date");
let selectedDate;

document.body.onresize = changeMenu


fetch("https://api.exchangeratesapi.io/latest")
    .then(respuesta => respuesta.json())
    .then(respuestaJson => {
        $('.sub-title').append(`check the rates in ${respuestaJson.base} base at <time id="time">${respuestaJson.date}</time>`);
        Object.keys(respuestaJson.rates).forEach(currency => {

            $('#table-exchange').append(`<tr class= "currency-table-row"><td>${currency}</td><td>${respuestaJson.rates[currency]}</td></tr>`);
        })

    })
    .catch(error => console.error("error:", error));

fetch("https://api.exchangeratesapi.io/latest")
    .then(respuesta => respuesta.json())
    .then(respuestaJson => {
        Object.keys(respuestaJson.rates).forEach(currencyName => {
            const $option = document.createElement("option");
            $option.textContent = currencyName;
            $select.appendChild($option);
        })
    })



$buttonBaseDate.onclick = obtenerBase;

function obtenerBase() {

    const $selectedIndex = $select.selectedIndex;
    const $option = $select.options;
    const base = $option[$selectedIndex].text;
    selectedDate = $inputDate.value;
    
       if( validateDateInput(selectedDate)==="empty"){
           return;
       }
    

    else {
        showTable();
        fetch(`https://api.exchangeratesapi.io/${selectedDate}?base=${base}`)
            .then(respuesta => respuesta.json())
            .then(respuestaJson => {

                $(".sub-title").text("");
                $('.sub-title').append(`check the rates in ${respuestaJson.base} base at <time id="time">${respuestaJson.date}</time>`);
                const $rowsTable = document.querySelectorAll(".currencyTableRow");

                $rowsTable.forEach(removeTableRows);
                Object.keys(respuestaJson.rates).forEach(currency => {

                    $('#table-exchange').append(`<tr class= "currencyTableRow"><td>${currency}</td><td>${respuestaJson.rates[currency]}</td></tr>`);
                })

            })
            .catch(error => console.error("error:", error));
    }
}

$menuIcon.onclick = expandMenu;
$arrowIcon.onclick = shrinkMenu;



function removeTableRows(tr) {
    tr.remove();
}




function showTable() {
    $table.classList.remove("oculto");
    $subTitle.classList.remove("oculto");
}

function expandMenu() {

    $menuIcon.classList = "oculto";

    document.querySelector(".nav-header").style.flexDirection = "column";
    document.querySelector(".nav-header").style.alignItems = "center";
    document.querySelector(".links-nav").style.display = "flex";
    $arrowIcon.className = "arrow-icon";



}

function shrinkMenu() {
    if (window.innerWidth < 500) {
        $arrowIcon.className = "oculto";
        $menuIcon.className = "arrow-icon";
        document.querySelector(".nav-header").style.flexDirection = "row";
        document.querySelector(".nav-header").style.justifyContent = "space-around"
        document.querySelector(".links-nav").style.display = "none";
    }
    else {

        $arrowIcon.className = "oculto";
        $menuIcon.className = "oculto";
        document.querySelector(".nav-header").style.flexDirection = "row";
        document.querySelector(".nav-header").style.justifyContent = "space-around"
        document.querySelector(".links-nav").style.display = "flex";

    }

    

}

function changeMenu() {
    if (window.innerWidth > 500) {
        $arrowIcon.className = "oculto";
        $menuIcon.className = "oculto";
        document.querySelector(".nav-header").style.flexDirection = "row";
        document.querySelector(".nav-header").style.justifyContent = "space-around"
        document.querySelector(".links-nav").style.display = "flex";

    }
    else {
        $arrowIcon.className = "oculto";
        $menuIcon.className = "menu-icon";
        document.querySelector(".nav-header").style.flexDirection = "row";
        document.querySelector(".nav-header").style.justifyContent = "space-around"
        document.querySelector(".links-nav").style.display = "none";

    }
}

function validateDateInput(date){
    if(date===""){
        $divErrorDate.classList.remove("oculto");
        $inputDate.setAttribute("disabled", true);
        return "empty";
    }


}

const $buttonErrorMessage = document.querySelector(".close-error-date");
$buttonErrorMessage.onclick = closeErrorMessage;

function closeErrorMessage(){
    $divErrorDate.classList.add("oculto");
    $inputDate.removeAttribute("disabled");
}













