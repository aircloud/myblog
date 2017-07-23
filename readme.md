新的博客 ： http://aircloud.10000h.top
原来的博客 (<A href="https://www.10000h.top">https://www.10000h.top</A>)仍然使用

---

#### 主要内容

这个为自己的一个博客的源代码，这个博客之后应当不断进行维护，也会从技术、设计和产品上作为自己一个不断更新的project。
目前可以访问https://www.10000h.top

[我的一个简单个人介绍：https://aircloud.github.io/myblog/]

#### 技术架构

*随着web技术发展，这一套写代码的逻辑缺点渐渐显现，现在自己已经用ES6的组件化开发思想进行新的项目学习，而这由于目前还有一定的可用性，加之时间原因，并没有对代码进行重构。*

****

目前PC端采用的后端nodejs，前端backbone，css用less支持，数据库用的mysql(本来想用mongodb，但是不想把数据直接存到本服务器上...就用了自己以前有的mysql数据库)      
移动端用nodejs+vue，并且还有一个nodejs+vuex+vue-loader+webpack+vue-router的进阶版本。

新的博客采用react服务端渲染


#### 更新日志

* 2016.08.25

博客初步上线，拥有文章、收藏、笔记、评论等功能。
开发了响应式后台，移动端、pc端均可以用。

* 2016.08.29

移动端博客初步做成，本着简约大气的原则，目前实现文章、收藏在移动端展示，尚未来得及实现评论、笔记等功能

* 2016.09.05

进行博客速度的优化：     
1. 用nginx根目录指向public，直接处理静态文件，并且配置图片、css等缓存时间。     
2. 对网页施行gzip压缩，优化访问速度。    
3. 对部分js代码利用Google提供的开源工具进行有效的代码压缩。     
4. 尚未实现充分利用，本来想用html5的离线存储发现效果不佳，暂时不用。     

* 2016.10.02

把博客由http迁移到https，由于是第一次做，做了一晚上：

1.首先在startssl官网上可以免费申请https三年，现在这个网站做了很大的简化，不用输入繁琐的用户信息了，直接注册即可，然后会有一个证书登陆的过程，登陆好了，就可以认证域名所有者，感觉只要是你的就可以申请https。

2.申请证书的过程中，你要生成一个key和一个csr文件，网站给出了一个生成代码：

```openssl req -newkey rsa:2048 -keyout yourname.key -out yourname.csr```

值得注意的是，这里面的yourname就是纯粹一个名字而已，自己一开始想多了。

3.拿着csr去换证书，由于自己用的是nginx服务器，所以换来的证书用nginx版本的。

4.把key和换来的证书都上传到服务器，关于怎么上传，可以参考我以前写的文章(传送门：http://blog.csdn.net/ul646691993/article/details/45014725)

5.上传好后，需要把你的key变一下（公钥)，代码样例：

```openssl rsa -in back.key -out back.10000h.key```

6.之后即可以配置https服务器了，直接配置nginx的配置文件，这里值得注意的是**原来的nodejs不用任何改动，直接配置nginx就行**，自己一开始不知道，以为也要把nodejs改成https，导致踩了很多坑。

核心配置：

```
ssl on;
#或者在需要https的端口加上ssl在后面:
ssl_certificate  /etc/nginx/conf.d/ssl2/1_10000h.top_bundle.crt;
ssl_certificate_key   /etc/nginx/conf.d/ssl2/ssl_ca2.key;

ssl_session_timeout 5m;
```
* 2016.11.13

调整了文章模块的多处样式，现在看着舒服了很多。

* 2016.11.14

如果需要增加一个nodejs进程，我需要做如下几件事情：

1. 增加conf配置文件，配置好域名和端口，注意upstream的名字不要重复。
2. 在网站目录下增加文件，权限777。
3. 给端口开放防火墙。
4. forever启动nodejs。
5. service重新启动nginx。

* 2017.02

完成了新的博客，采用react服务端渲染

*2017.02.20*
增加了index.md，为个人简历相关内容。
