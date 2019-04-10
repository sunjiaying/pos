window.calc = function(value) {
    var objs = value;
    // var objs = JSON.parse(JSON.stringify(value));
    console.log('重置...');
    objs.items.forEach(item => {
        item.fprice = item.tprice;
    });
    return objs;
}