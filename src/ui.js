const $select = document.querySelector("#base-select");
const $divErrorDate = document.querySelector(".error-date");
const $inputDate = document.querySelector("#date-selection");
const $menuIcon = document.querySelector("#menu-icon");
const $arrowIcon = document.querySelector("#arrow-icon");

$menuIcon.onclick = expandMenu;
$arrowIcon.onclick = shrinkMenu;


export function setTodayToInputDate(){
    const fecha = new Date();
    const hoy = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
    $inputDate.setAttribute("max", hoy);
}



export function createSubTitleAndTable(exchanges) {
    
    $('.sub-title').append(`check the rates in ${exchanges.base} base at <time id="time">${exchanges.date}</time>`);
    Object.keys(exchanges.rates).forEach(currency => {

        $('#table-exchange').append(`<tr class= "currency-table-row"><td>${currency}</td><td>${exchanges.rates[currency]}</td></tr>`);
    })
}

export function fillSelectElement(latestExchanges) {
    Object.keys(latestExchanges.rates).forEach(currencyName => {
        const $option = document.createElement("option");
        $option.textContent = currencyName;
        $select.appendChild($option);
    })
    const $optionEur = document.createElement("option");
    $optionEur.textContent= "EUR";
    $select.appendChild($optionEur);
}

export function getBase(getUserSelection) {
    

    const selectedDate = $inputDate.value;
    
    if (validateDateInput(selectedDate) === "empty") {
        return;
    }
    else {

            const $selectedIndex = $select.selectedIndex;
            const $option = $select.options;
            const base = $option[$selectedIndex].textContent;
            
                
                    showTable();
                    
                    getUserSelection(base, selectedDate)
                        .then(response => {
                            cleanSubtitleAndTable();
                            
                            createSubTitleAndTable(response)

                        })
                
        }



    }


function validateDateInput(date) {
    
    if (date === "") {
        $divErrorDate.classList.remove("oculto");
        $inputDate.setAttribute("disabled", true);
        return "empty";
    }
}

function showTable() {
    
    const $table = document.querySelector(".table-exchange");
    const $subTitle = document.querySelector(".sub-title");
    $table.classList.remove("oculto");
    $subTitle.classList.remove("oculto");
}

function cleanSubtitleAndTable() {
    $(".sub-title").text("");
    const $rowsTable = document.querySelectorAll(".currencyTableRow");
    $rowsTable.forEach(removeTableRows);
}

function removeTableRows(tr) {
    tr.remove();
}

const $buttonErrorMessage = document.querySelector(".close-error-date");
$buttonErrorMessage.onclick = closeErrorMessage;

function closeErrorMessage() {
    $divErrorDate.classList.add("oculto");
    $inputDate.removeAttribute("disabled");
}

export function expandMenu() {

    $menuIcon.classList = "oculto";

    document.querySelector(".nav-header").style.flexDirection = "column";
    document.querySelector(".nav-header").style.alignItems = "center";
    document.querySelector(".links-nav").style.display = "flex";
    $arrowIcon.className = "arrow-icon";



}

export function shrinkMenu() {
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

export function changeMenu() {
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