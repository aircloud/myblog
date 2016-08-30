/**
 * Created by hh on 14/8/2016.
 */
$().ready(function () {
    var tagview = Backbone.View.extend({

        el:$(".tags"),

        my_template: _.template($('#tagView').html()),

        initialize: function(){
            this.render();
        },

        render: function(){
            var that = this;
            $.get("/gettags",function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                $("#tagNumber").html(data.len);
            });
        }
    });

    var router = Backbone.Router.extend({
       routes:{
           "tag/:tag":"getListByTag",
           "article/:id":"getArticleById"

       },

       getArticleById:function(id){
           // alert(id);
           articleView.render(id);
       },

       getListByTag:function(tag){
           console.log(tag);
           litView.render(tag);
           console.log($("li[title!='"+tag+"']"));
       }

    });

    var listview = Backbone.View.extend({
        el:$("#dynamic"),

        my_template: _.template($('#listByTag').html()),

        initialize: function(){
            // this.render("");
        },

        render: function(tag){
            var that = this;
            $.get("/getlistbytag/"+tag,function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                $("li[title='"+tag+"']").addClass("active_li");
                $("li[title!='"+tag+"']").removeClass("active_li");
            });
        }

    });

    var articleview = Backbone.View.extend({
        el:$("#dynamic"),

        my_template: _.template($('#articleByTag').html()),

        initialize: function(){
            // this.render("");
        },

        render: function(id){
            var that = this;
            $.get("/getarticlebyid/"+id,function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            });
        }

    });

    var articleView = new articleview();
    var litView = new listview();
    var tagView = new tagview();
    var route1 = new router();
    Backbone.history.start();

});