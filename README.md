# POS
此DEMO是为了解决POS当中解决灵活的定价问题（会员折扣、券规则、促销活动等）
利用将定价逻辑在js当中定义，将变更频次和灵活度高的逻辑进行耦合性实现
## 如何下载
```
git clone https://github.com/sunjiaying/pos.git
cd pos
yarn
npm run dev
```

>为了方便调试加载远端js，建议通过devd工具（go语言）进行启动web服务，当前源代码当中是将js文件放在云服务器
```
go get -v -u github.com/cortesi/devd/cmd/devd
go install github.com/cortesi/devd/cmd/devd
```
进到相关的web文档目录，然后运行
```
devd -ol .
```
