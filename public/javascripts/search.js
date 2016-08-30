/**
 * Created by hh on 15/8/2016.
 */
$().ready(function(){


    //article
    var view1 = Backbone.View.extend({

        el:$(".search_result"),

        my_template: _.template($('#searchResultView').html()),

        initialize: function(){
            // this.render();
        },

        render: function(keyword){
            var that = this;
            $.get("/searcharticle/"+keyword,function(data){
                if(data["data"].length==0){data.type=data.type+"<span class=\"noone\">没有找到相关内容</span>"}
                that.$el.append(that.my_template(data));
            });
        }
    });

    //short
    var view2 = Backbone.View.extend({
        el:$(".search_result"),

        my_template: _.template($('#searchResultView').html()),

        initialize: function(){
            // this.render();
        },

        render: function(keyword){
            var that = this;
            $.get("/searchshort/"+keyword,function(data){
                if(data["data"].length==0){data.type=data.type+"<span class=\"noone\">没有找到相关内容</span>"}
                that.$el.append(that.my_template(data));
            });
        }
    });

    var view3 = Backbone.View.extend({
        el:$(".search_result"),

        my_template: _.template($('#searchResultView').html()),

        initialize: function(){
            // this.render();
        },

        render: function(keyword){
            var that = this;
            $.get("/searchcollec/"+keyword,function(data){
                if(data["data"].length==0){data.type=data.type+"<span class=\"noone\">没有找到相关内容</span>"}
                that.$el.append(that.my_template(data));
            });
        }
    });

    var router = Backbone.Router.extend({
        routes:{
            "search/:keyword":"getsearch"
        },

        getsearch:function(keyword){
            $(".this_result").remove();
            console.log(keyword);
            View1.render(keyword);
            View2.render(keyword);
            View3.render(keyword);
        }
    });
    console.log("begin");
    var View3 = new view3();
    var View1 = new view1();
    var View2 = new view2();
    var router1 = new router();
    Backbone.history.start();

});


