/**
 * Created by hh on 14/8/2016.
 */
$().ready(function () {

    var tagview = Backbone.View.extend({

        el:$(".tags"),

        my_template: _.template($('#collecList').html()),

        initialize: function(){
            this.render();
        },

        render: function(){
            var that = this;
            $.get("/getcollectags",function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                $("#tagNumber").html(data.len);
            });
        }
    });


    var tagView = new tagview();

    var collecview = Backbone.View.extend({

        el:$(".list3"),

        my_template: _.template($('#thiscollec').html()),

        initialize: function(){
            // this.render();
        },

        render: function(tag){
            var that = this;
            $.get("/getcollec/"+tag,function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                $("li[title='"+tag+"']").addClass("active_li");
                $("li[title!='"+tag+"']").removeClass("active_li");
            });
        }
    });

    var collecView = new collecview();

    var router = Backbone.Router.extend({
        routes:{
            "tag/:tag":"getCollec"
        },

        getCollec:function(tag){
            console.log(tag);
            collecView.render(tag);
        }

    });

    var route1 = new router();
    Backbone.history.start();
});