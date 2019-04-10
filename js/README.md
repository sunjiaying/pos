这里面的文件只是用于DEMO演示，并不会进入webpack过程

>为了方便调试加载远端js，建议通过devd工具（go语言）进行启动web服务，当前源代码当中是将js文件放在云服务器
```
go get -v -u github.com/cortesi/devd/cmd/devd
go install github.com/cortesi/devd/cmd/devd
```
进到相关的web文档目录，然后运行
```
devd -ol .
```