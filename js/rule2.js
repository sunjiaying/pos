window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('在这里开始计算过程...');
    objs.items.forEach(item => {
        item.fprice = item.tprice;
    });
    var gitfMatcode = 'A1143001102';
    var total = getTotalWithoutMat(objs, gitfMatcode);    
    if (total.fprice > 5000) {
        objs.items.forEach(item => {
            if (item.matcode === gitfMatcode) {
                item.fprice = 0;
            }
        });
    }
    return objs;
}

// 获取合计
function getTotal(bill) {
    var total = {};
    total.tprice = 0;
    total.fprice = 0;
    bill.items.forEach(item => {
        total.tprice = total.tprice + item.tprice;
        total.fprice = total.fprice + item.fprice;
    });
    return total;
}

// 获取合计
function getTotalWithoutMat(bill, matcode) {
    var total = {};
    total.tprice = 0;
    total.fprice = 0;
    bill.items.forEach(item => {
        if (matcode != matcode) {
            total.tprice = total.tprice + item.tprice;
            total.fprice = total.fprice + item.fprice;
        }
    });
    return total;
}