import $ from 'jquery';
import store from './store';

const generateMain = () => {
    return `
        <h1>Waitstaff Calculator</h1>
        ${generateFormString()}
    `;
} 

const generateFormString = () => {
    return `
        <form>
            <div class="details">
                <h2>Enter the Meal Details</h2>
                <div>
                <label for="price">Base Meal Price: $</label>
                <input id="price" type="number" required/>
                </div>
                <div>
                <label for"tax">Tax Rate: %</label>
                <input id="tax" type="number" required/>
                </div>
                <div>
                <label for"tip">Tip Percentage %</label>
                <input id="tip" type="number" required/>
                </div>
                <div>
                <button id="submit" type="submit">Submit</button>
                <button id="cancel">Cancel</button>
                </div>
            </div>
            <div class="right-pane">
                ${renderRightString()}          
            </div>
            <button id="reset" type="reset">Reset</button>
        </form>
    `;
}

const renderRightString = () => {
    let avg = store.getTipTotal() / store.getMealCount()
    console.log(avg)
    return `
        <div class="charges">
            <h2>Customer Charges</h2>
            <span>Subtotal ${store.bill.subTotal}</span>
            <span>Tip ${store.bill.tip}</span>
            <hr/>                
            <span>Total ${store.getTotal()}</span>
        </div>
        <div class="earnings">
            <h2>My Earnings Info</h2>
            <span>Tip Total ${store.getTipTotal()}</span>
            <span>Meal count ${store.getMealCount()}</span>
            <span>Average Tip Per Meal ${avg >=0 ? avg: 0}</span>
        </div>
        `;
};

const renderRight = () => {
    $('.right-pane').html(renderRightString);
}

const handleSubmit = () => {
    $('#root').on('submit', function(e) {
        e.preventDefault();
        const price = parseInt($('#price').val());
        const tax = parseInt($('#tax').val());
        const tip = parseInt($('#tip').val());
        // console.log(price, tax, tip);
        

        store.calculateSubtotal(price, tax);
        store.calculateTip(tip); 
        
        console.log(store.bill.tip, store.bill.subTotal);
        renderRight();
    });
};

const handleCancel = () => {
    $('#root').on('click', '#cancel', () => {
        $('#price').val('');
        $('#tax').val('');
        $('#tip').val('');
    });
}

const handleReset = () => {
    $('#root').on('reset', function(e){
        store.reset();
        render();
    })
}

const render = () => {
    $('#root').html(generateMain());
}
const bindEventListners = function(){
    handleSubmit();
    handleCancel();
    handleReset();
}
export default {
    render,
    bindEventListners
}