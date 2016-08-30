/**
 * Created by hh on 12/8/2016.
 */
$().ready(function () {

    //这应该算是公共的方法,不是仅仅index有的

    var listView = Backbone.View.extend({

        el:$(".info_li"),

        my_template: _.template($('#listTemplate').html()),

        initialize: function(){
            this.render();
        },

        render: function(){
            var dataroot="config_data/index_list.json";
            var that = this;
            $.getJSON(dataroot, function(datas) {
                that.$el.html(that.my_template(datas));
                //注意两点:一点是函数的调用方式(通过检查underscore源码看出),一种是返回值中的this
            });
        }
    });

    var mydata  = Backbone.Model.extend({
        defaults:function () {
            return {
                article_number:0,
                s_article_number:0,
                visitors:0
            }
        },
        url:"/savedata"
    });

    var mydata_view = Backbone.View.extend({

        el:$(".info_data"),

        my_template: _.template($('#dataTemplate').html()),

        initialize: function(){
            // this.model.fetch();
            // console.log(this.model);
            this.$el.html(this.my_template(this.model.toJSON()));
        }
    });

    var myData;
    $.get("/getdata",function(data){
        myData = new mydata((eval(data))[0]);
        // console.log(myData.toJSON());
        var mylistView = new listView();
        var mydataView = new mydata_view({model:myData});
    });

    $(".protrait_s").attr("src","images/photo.jpg");
    $("#banner1").attr("src","images/banner.jpg");
    $("#index_search").bind('keydown',function(event){

        if(event.keyCode==13) {
            var search_text = $("#index_search").val();
            location.assign("search.html#search/"+search_text);
            return false;
        }
    });
});
