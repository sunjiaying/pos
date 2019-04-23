window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('在这里开始计算过程...');
    objs.items.forEach(item => {
        // 重置应收款&可反积分
        item.fprice = item.tprice;
        item.point = item.fprice / 20;// 20元积1分
    });
    var gitfMatcode = 'A1143001102';
    var total = getTotalWithoutMat(objs, gitfMatcode);    
    if (total.fprice > 5000) {
        objs.items.forEach(item => {
            if (item.matcode === gitfMatcode) {
                item.fprice = 0;
                item.point = item.fprice / 20;
            }
        });
    }
    return objs;
}

// 获取合计(排除Mat款)
function getTotalWithoutMat(bill, matcode) {
    var total = {};
    total.tprice = 0;
    total.fprice = 0;
    bill.items.forEach(item => {
        if (item.matcode != matcode) {
            total.tprice = total.tprice + item.tprice;
            total.fprice = total.fprice + item.fprice;
        }
    });
    return total;
}

// 白名单和黑名单能用于在促销活动中指定相应的商品参与或者排队参与
// 白名单
var whiltelist = [
    "A123",
    "A1234"
]

// 黑名单
var blacklist = [
    "B123",
    "B1234"
]