# drifting-bottle

基于 express+redis 实现的漂流瓶 demo

## 开发过程中的问题

### centOS 安装redis遇到的问题及解决

CentOS5.7默认没有安装gcc，这会导致我们无法make成功。使用yum安装：

```bash
yum -y install gcc
```

make时报如下错误：

```bash
zmalloc.h:50:31: error: jemalloc/jemalloc.h: No such file or directory
zmalloc.h:55:2: error: #error "Newer version of jemalloc required"
make[1]: *** [adlist.o] Error 1
make[1]: Leaving directory `/data0/src/redis-2.6.2/src'
make: *** [all] Error 2
```

原因是jemalloc重载了Linux下的ANSI C的malloc和free函数。解决办法：make时添加参数。

```bash
make MALLOC=libc
```

make之后，会出现一句提示

```shell
Hint: To run 'make test' is a good idea ;)
```

但是不测试，通常是可以使用的。若我们运行make test ，会有如下提示

```shell
[devnote@devnote src]$ make test
You need tcl 8.5 or newer in order to run the Redis test
make: ***[test] Error_1
```

解决办法是用yum安装tcl8.5（或去tcl的官方网站http://www.tcl.tk/下载8.5版本，并参考官网介绍进行安装）

```shell
yum install tcl
```

版权声明：本文为CSDN博主「心诚则灵--艾」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u010775025/article/details/80340586

### memurai

在 windows 上运行 redis 的替代品 memurai, 这个替代品似乎不支持 getdel 命令. 运行这个命令会报错. 没找到解决方案

```text
(error) ERR unknown command `getdel`, with args beginning with: `abc`,
```
