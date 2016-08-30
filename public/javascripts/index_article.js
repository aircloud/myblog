/**
 * Created by hh on 14/8/2016.
 */
$().ready(function () {

    var show_number=0,tag=0;
    var loader = $("#loader");
    var scrolltop,offheight,clientheight;
    // var myarticle  = Backbone.Model.extend({
    //     defaults:function () {
    //         return {
    //             article_number:0,
    //             s_article_number:0,
    //             visitors:0
    //         }
    //     },
    //     url:"http://localhost:3000/indexarticle"
    // });
    // var myArticle = new myarticle();

    // myArticle.url="http://localhost:3000/indexarticle/"+show_number;
    // myArticle.fetch({
    //     data: { "id": "book_" + new Date().getTime() }
    //     , success: function (collection, response) {
    //         var i = 2;
    //         alert(1);
    //     }
    //     , error: function (collection, response) {
    //         var i = 1;  //后台数据返回了，却一直是执行error回调
    //             console.log("error=" + response.responseText);
    //     }
    // });

    // var article_collection = Backbone.Collection.extend({
    //    model:myarticle
    // });

    var article_view = Backbone.View.extend({

        el:$("#article_container"),

        my_template: _.template($('#articleView').html()),

        initialize:function(){
            var that = this;
            $.get("/getindexarticle/"+show_number,function(data){
                console.log(data);
                if(data.over==0)
                that.$el.append(that.my_template(data));
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            });
        },
        render:function(){
            var that = this;
            if(tag==0) {
                show_number=show_number+1;
                tag=1;//用tag防止多重请求的发生
                $.get("/getindexarticle/" + show_number, function (data) {
                    console.log(data);
                    // console.log(show_number);
                    loader.css("display", "none");
                    if (data.over == 0)
                        that.$el.append(that.my_template(data));
                    else {
                        loader.html("<p class='nodata'>没有更多数据了</p>").css("display", "flex").css("width", "800px");
                        window.onscroll = null;
                    }
                    tag=0;
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                });
            }
            else{
               return 0;
            }
        }
    });

    var articleView = new article_view();

    window.onscroll=function(){
        scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
        offheight=document.body.offsetHeight;
        clientheight=document.documentElement.clientHeight||document.body.clientHeight;
        // console.log(scrolltop,offheight,clientheight);
        if(scrolltop+clientheight==offheight){
            loader.css("display","block");
            articleView.render();
        }
    };
});