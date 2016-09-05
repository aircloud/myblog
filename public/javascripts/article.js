/**
 * Created by hh on 14/8/2016.
 */
$().ready(function () {
    var temp="";
    var current="";

    var commentmodel = Backbone.Model.extend({
        defaults:function () {
            return {
                name:"",
                time:"",
                comment:"",
                email:""
            }
        },
        url:"/savecomment"
    });

    var commentcollec = Backbone.Collection.extend({
       url:"/getallcomment",

       model:commentmodel
    });

    var commentCollec = new commentcollec();
    var commentview = Backbone.View.extend({
       el:$("#toAdd"),

       my_template: _.template($('#commentModel').html()),

       initialize: function(){
            // this.render();
           this.listenTo(commentCollec, 'add', this.addOne);
           this.listenTo(commentCollec, 'reset', this.addAll);
           this.listenTo(commentCollec, 'all', this.render);

       },

       render:function(){

       },

       addOne:function(model){
           console.log("addone");
           console.log("model",model.toJSON());
           this.$el.append(this.my_template(model.toJSON()));
       },

       addAll:function(){
           console.log("addall");
           commentCollec.each(this.addOne(),this);
       }

    });


    var articlelistview = Backbone.View.extend({

        el:$(".article_list"),

        my_template: _.template($('#articleList').html()),

        initialize: function(){
            this.render();

        },

        render: function(){
            var that = this;
            $.get("/getarticlelist",function(data){
                console.log(data);
                document.title="我的文章";
                that.$el.html(that.my_template(data));
            });
        }
    });
    var router = Backbone.Router.extend({
        routes:{
            "article/:id":"getArticleById",
            "article":"getlist"
        },

        getlist:function(){
            articleListView.render();
            $('html,body').animate({scrollTop: '0px'}, 500);
            $(".comment_module").css('display','none');
        },
        getArticleById:function(id){
            // alert(id);
            articleView.render(id);
            current=id;
            $('html,body').animate({scrollTop: '0px'}, 500);
            commentView.$el.empty();
            commentCollec.fetch({"data":{"id":id}});
            $(".comment_module").css('display',"block");
        }
    });

    var articleview = Backbone.View.extend({
        el:$(".article_list"),

        my_template: _.template($('#activeArticle').html()),

        initialize: function(){
        },

        render: function(id){
            var that = this;
            $.get("/getactivearticle/"+id,function(data){
                console.log(data);
                that.$el.html(that.my_template(data));
                document.title=data.item.title;
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            });
        }
    });
    var commentView = new commentview();
    var articleListView = new articlelistview();
    var  articleView = new articleview();
    var route2 = new router();
    Backbone.history.start();

    $("#submit").bind("click",function(event){
       event.preventDefault();
       // event.preventBubble();
       var comment=$("#comment").val();
       var name=$("#name").val();
       if(name=="")name="匿名用户";
       var email=$("#email").val();
       // var mydate = new Date();
       mydate=(new Date()).toLocaleString();

       if(temp!=comment){
           var model = new commentmodel({
               name:name,
               comment:comment,
               email:email,
               time:mydate,
               target_id:current
           });
           model.save();
           commentCollec.add(model);
       }
       else{
           alert("评论无效");
       }
       console.log("save",comment,name,email);
       return false;
    });

});