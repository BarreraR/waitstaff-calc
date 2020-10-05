import $ from 'jquery';
const tips = [];
const bill = {
    tip: 0,
    subTotal: 0
}

const getTotal = () => {
    return bill.subTotal + bill.tip;
};

const calculateSubtotal = (price, tax) => {
    bill.subTotal = price + price * tax / 100;
}

const calculateTip = (tip) => {
    bill.tip = bill.subTotal * tip / 100;
    tips.push(bill.tip);
}

const getMealCount = () => tips.length;

const getTipTotal = () => {
    return tips.reduce((a,b) => a + b, 0);
}

const reset = () => {
    tips.splice(0, tips.length);
    bill.tip = 0;
    bill.subTotal = 0;
}

export default {
    tips,
    bill,
    calculateTip,
    calculateSubtotal,
    getTotal,
    getMealCount,
    getTipTotal,
    reset
}