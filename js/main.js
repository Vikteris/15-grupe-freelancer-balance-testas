"use strict"
/*---------- užtuois-------*/

function render( data, months) {
    
    let HTML ='';
    let totalIncome = 0
    let totalExpense = 0
    let minIncomeMonth = {index: 1, value: Infinity};
    let maxIncomeMonth = {index: 1, value: 0};
    let minExpenseMonth = {index: 1, value: Infinity};
    let maxExpenseMonth = {index: 1, value: 0};

    const DOMtableContnet = document.querySelector('.table-content');
    const DOMtotalBalance = document.querySelector('.table-footer > .cell:nth-child(5)');
    const DOMtotalIncome = document.querySelector('.table-footer > .cell:nth-child(3)');
    const DOMtotalExpense = document.querySelector('.table-footer > .cell:nth-child(4)');
    const DOMminIncome = document.getElementById("minIncome");
    const DOMmaxIncome = document.getElementById("maxIncome");
    const DOMminExpense = document.getElementById("minExpense");
    const DOMmaxExpense = document.getElementById("maxExpense");


    // duomenu rikiavimas
    let orderedData = [];
    for(let i=0; i<data.length; i++){
        const searchFor = i+1;
        for(let m=0; m<data.length; m++){
            if(data[m].month === searchFor){
                orderedData.push(data[m]);
                break;
            }
        }
    }
    data = orderedData;

    //spausdinimas
    let monthBalance = 0;
    for(let i=0; i<orderedData.length; i++){
        const monthData = orderedData[i];
        const income = monthData.income || 0;
        const expense = monthData.expense || 0;
        monthBalance += income - expense;
        totalIncome += income;
        totalExpense += expense;

        //ar minIncome
            if ( income < minIncomeMonth.value && income !== 0){
                minIncomeMonth.value = income;
                minIncomeMonth.index = i;
            }
        //ar maxIncome
            if ( income > maxIncomeMonth.value){
                maxIncomeMonth.value = income;
                maxIncomeMonth.index = i;
            }
        //ar minExpense
            if ( expense < minExpenseMonth.value && expense !== 0){
                minExpenseMonth.value = expense;
                minExpenseMonth.index = i;
            }
        //ar maxExpense
            if ( expense > maxExpenseMonth.value){
                maxExpenseMonth.value = expense;
                maxExpenseMonth.index = i;
            }

        
       HTML += 
       ` <div class="table-row">
            <div class="cell">${i+1}</div>
            <div class="cell">${months[ monthData.month-1]}</div>
            <div class="cell">${income >0 ? income + ' Eur' : '-'}</div>
            <div class="cell">${expense >0 ? expense + ' Eur' : '-'}</div>
            <div class="cell">${monthBalance} Eur</div>
        </div>`;
    }
        DOMtotalIncome.innerHTML= totalIncome+ ' Eur';
        DOMtotalExpense.innerHTML= totalExpense+ ' Eur';        
        DOMtotalBalance.innerHTML= monthBalance+ ' Eur';

        DOMminIncome.innerText = months[minIncomeMonth.index];
        DOMmaxIncome.innerText = months[maxIncomeMonth.index];
        
        DOMminExpense.innerText = months[minExpenseMonth.index];
        DOMmaxExpense.innerText = months[maxExpenseMonth.index];
        

    return DOMtableContnet.innerHTML = HTML;
}

render(account, months );