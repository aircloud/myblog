####主要内容

这个为自己的一个博客的源代码，这个博客之后应当不断进行维护，也会从技术、设计和产品上作为自己一个不断更新的project。
目前可以在tempwrite.msocca.com访问(临时地址)

####技术架构

目前PC端采用的后端nodejs，前端backbone，css用less支持，数据库用的mysql(本来想用mongodb，但是不想把数据直接存到本服务器上...就用了自己以前有的mysql数据库)      
移动端用nodejs+vue，并且还有一个nodejs+vuex+vue-loader+webpack+vue-router的进阶版本。


####更新日志

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
4. 尚未实现利用Etags压缩，本来想用html5的离线存储发现效果不佳，暂时不用。     

