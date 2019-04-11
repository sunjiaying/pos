window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('重置...');
    objs.items.forEach(item => {
        // 重置应收款
        item.fprice = item.tprice;
        // 重置可反积分
        item.point = item.fprice / 20; // 20元积1分
    });
    return objs;
}