window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('在这里开始计算过程...');
    objs.items.forEach(item => {
        item.fprice = item.tprice * 0.6;
    });
    return objs;
}