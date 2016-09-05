/**
 * Created by hh on 13/8/2016.
 */
$().ready(function () {

    var shortthis  = Backbone.Model.extend({
        defaults:function () {
            return {
                ID:0,
                title:"111",
                time:"",
                content:"",
                tag:[]
            }
        },
        url:"/shortthis/"
    });

    var shortthisview = Backbone.View.extend({

        el:$(".short_main_l"),

        events:{
            "click #backToList":"getlist"
        },

        getlist:function () {
            shortView.render();
        },

        my_template: _.template($('#shortThis').html()),

        initialize: function(){
            // this.model.fetch();
            // console.log(this.model);
            this.$el.html(this.my_template(this.model.toJSON()));
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
        render:function(){
            this.$el.html(this.my_template(this.model.toJSON()));
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }
    });

    var shortThis0,shortThisView;
    shortThis0=new shortthis();

    var shorts = Backbone.PageableCollection.extend({
       url:"http://tempwrite.msocca.com/getshort",

       state:{
           pageSize:9,
           order:1,
           sortKey:''
       },
       queryParams: {
            // sortKey: "sort",
            q: "state:closed repo:jashkenas/backbone"
       },

        //以下两行实际上决定了你发的数据的格式

        parseState: function (resp, queryParams, state, options) {
            return {totalRecords: resp.total_count};
        },

        parseRecords: function (resp, options) {
            return resp.items;
        }
    });
    //暂时把这个shorts当作collection对待

    var shortItems = new shorts();

    var shortview = Backbone.View.extend({

        events:{
            "mouseover .short_main_each":"change_outline",
            "mouseout .short_main_each":"remove_outline",
            "click .tag_search":"set_tagsort",
            "click .toDetail" :"getdetail"
        },

        el: $(".short_main_l"),

        getdetail:function(event){
            var id =event.currentTarget.attributes['title'].value;
            console.log(id);
            shortThis0.url="/shortthis/"+id;
            shortThis0.fetch({success:function(){
                shortThisView=new shortthisview({model:shortThis0});
            }});

            console.log(shortThis0);
        },

        set_sort:function(val){
            console.log(val);
            val="all,"+val;
            shortItems.setSorting(val);
            // shortItems.fetch();
            shortItems.getFirstPage();
            this.$el.empty();
            $("#paginator").html(paginator.render().$el);
        },

        set_tagsort:function(event){
            var sort_key=event.currentTarget.firstChild.nodeValue;
            sort_key="tag,"+sort_key;
            shortItems.setSorting(sort_key);
            // shortItems.fetch();
            shortItems.getFirstPage();
            // paginator = new Backgrid.Extension.Paginator({
            //     collection: shortItems
            // });
            $("#paginator").html(paginator.render().$el);

        },
        //这也算是自己遇到的一个坑了
        change_outline:function(event){
            event.stopPropagation();
            event.preventDefault();
            $(event.currentTarget).addClass("outline");
              // console.log(this);
        },

        remove_outline:function(event){
            $(event.currentTarget).removeClass("outline");
        },

        my_template: _.template($('#shortView').html()),

        initialize: function(){
            // this.render();
            var collection = this.collection;
            this.listenTo(collection,'reset',this.render);
            // this.listenTo(collection,'change',this.render);
            // this.listenTo(collection, "add", this.render);
            // this.listenTo(collection, "remove", this.render);
            this.listenTo(collection, "sort", this.render);
        },

        render:function () {
            console.log('render again');
            var that = this;
            that.$el.empty();
            shortItems.each(function(model,index,list){
                    that.$el.append(that.my_template(model.toJSON()));
            });
               // _.each(shortItems,function(data){
               //     console.log(data);
               //     that.$el.append(that.my_template(data));
               // });
            // shortItems.getNextPage();
        }
    });
    var shortView = new shortview({collection:shortItems});
    
     var router = Backbone.Router.extend({
        routes:{
            "short/:id":"getShortById",
            "short":"getAllShort",
            "":"getAllShort"
        },
        getAllShort:function(){
             console.log("render...");
                shortItems.getFirstPage().done(function () {
                 // shortView.render();
               });
        },
        getShortById:function(id){
            if(!id){
               
            }
            else{
                 shortThis0.url="/shortthis/"+id;
                 shortThis0.fetch({success:function(){
                 shortThisView=new shortthisview({model:shortThis0});
            }});
            }    
          
        }
    });


    

    var paginator = new Backgrid.Extension.Paginator({
        collection: shortItems
    });
    $("#paginator").append(paginator.render().$el);

    var route2 = new router();
    Backbone.history.start();

    $("#begin_search").bind("click",function(){
        var search_text = $("#short_search").val();
        console.log(search_text);
        shortView.set_sort(search_text);
    });
    $("#short_search").bind('keydown',function(event){

        if(event.keyCode==13) {
            var search_text = $("#short_search").val();
            console.log(search_text);
            shortView.set_sort(search_text);
            return false;
        }
    });

    $(".toDetail").bind('click',function(){
       console.log("111");
       var thisID = $(this).val('title');
       console.log(thisID);
    });


    // $(".short_main_each").bind("mouseover",function(){console.log(this);$(this).addClass("outline");});
    //不能这样绑定因为这时候还没有这个类呢
});