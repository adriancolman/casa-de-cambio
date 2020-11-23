

/// <reference types="jquery"/>


const $buttonBaseDate = document.querySelector("#button-base");


import { createSubTitleAndTable, fillSelectElement, getBase, changeMenu, expandMenu, shrinkMenu, setTodayToInputDate } from './ui.js'
import { callingLatestExchanges as lastExchanges, getUserSelectedExchanges as selectedExchanges } from './api-calls.js'

document.body.onresize = changeMenu
setTodayToInputDate();

lastExchanges().then((response) => {
    createSubTitleAndTable(response)
    fillSelectElement(response);
})


$buttonBaseDate.onclick = () => {

    getBase(selectedExchanges);
};




















