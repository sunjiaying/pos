window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('在这里开始计算过程...');
    objs.items.forEach(item => {
        // 整单8折
        item.fprice = item.tprice * 0.8;
        item.point = item.fprice / 20; // 20元积1分
    });
    return objs;
}