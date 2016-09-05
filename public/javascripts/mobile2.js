/**
 * Created by hh on 21/8/2016.
 */
var sideBar = document.getElementById('side');
var mycontent=document.getElementById("mycontent");
var tabSide =document.getElementById("tab_side");
var fixMenu = document.getElementById("fix_menu");

var MyComponent = Vue.extend({
    template: '#indexpage',

    data: function() {
        return {
            ifnomore:false,
            togetmore:false,
            show1: true,
            number:0,
            article:[],
            start:{
                x:0,
                y:0
            }
        }
    },
    computed: {
      bannerurl:function(){
          var temp = Math.ceil(Math.random()*7);
          return "../images/banner"+temp+".jpg";
      }
    },

    ready:function(){
        console.log("hello created");
        var that = this;
        setTimeout(function() {
            reqwest('/getsomearticle/' + that.number, function (data) {
                that.number += 3;
                for (var i = 0; i < 3; i++) {
                    that.article.push(data[i]);
                }
                that.togetmore = true;
            });
        },300);
        // setTimeout(function(){
        //     this.article=that.article;
        // },2000);
    },
    methods:{
        getmore:function(e){
            var scrolltop = document.body.scrollTop||document.documentElement.scrollTop;//上滑的距离
            var offheight=document.body.offsetHeight;//所有的距离
            var clientheight=document.documentElement.clientHeight||document.body.clientHeight;//视窗高度

            var that = this;
            e = e.changedTouches ? e.changedTouches[0] : e;

            console.log(scrolltop,"-",offheight,"-",clientheight,'-',e.pageY);
            var tempoff=scrolltop+clientheight-e.pageY+that.start.y-offheight;
            console.log(tempoff,"__");
            if(tempoff>0&&that.togetmore) {
                that.togetmore=false;
                reqwest('/getsomearticle/'+that.number, function (data) {
                    if(data!=[]) {
                        console.log("ok");
                        that.number += 3;
                        for (var i = 0; i < 3; i++) {
                            console.log(data[i]);
                            if(data[i])
                            that.article.push(data[i]);
                            else{
                                that.ifnomore=true;
                            }
                        }
                        that.togetmore=true;
                    }
                    else{
                        that.ifnomore=true;
                    }
                });
            }
        },
        inito:function(e){
            e = e.changedTouches ? e.changedTouches[0] : e;
            this.start.x = e.pageX;
            this.start.y = e.pageY;
            console.log("start move",this.start.y);
            // console.log(this.article);
        },
        handcroll:function(){
            console.log("scroll");
        }
    },
    events: {
        greeting: function (msg) {
            console.log(msg,"hello")
        }
    }
});


var articleList = Vue.extend({

    template: '#article_list',

    data: function() {
        return {
            show1: true,
            article:[]
        }
    },

    ready:function(){
        var that = this;
        reqwest('/getallarticle', function (data) {
            for (var i = 0; i < data.length; i++) {
                that.article.push(data[i]);
            }
        });
    }

});

var myarticle = Vue.extend({
    template:"#myarticle",

    data:function(){
        return{
            article:{}
        }
    },

    ready:function(){
        var that = this;
        console.log("search",that.$route.query.id);
        reqwest('/getarticlebyid/'+that.$route.query.id, function (data) {
                // that.article=data.data;
                console.log(data.data);
                Vue.set(that.article,'title',data.data.title);
                Vue.set(that.article,'content',data.data.content);
                // console.log(that.article);
        });
    }
});

var mycollec  = Vue.extend({

    template: '#mycollec',

    data: function() {
        return {
            toggle_text:"展开分类",
            if_show_class:false,
            show1: true,
            collec:[],
            allclass:[]
        }
    },

    ready:function(){
        var that = this;
        reqwest('/getallcollec', function (data) {
            for (var i = 0; i < data.length; i++) {
                that.collec.push(data[i]);
            }
        });
        reqwest('/getcollectags',function(data){
            for(var i=0;i<data.data.length;i++)
            {
                that.allclass.push(data.data[i]);
            }
            that.allclass.push("全部");
            console.log(that.allclass);
        })
    },

    methods:{
        toggle_class:function(){
            if(this.if_show_class){
                this.if_show_class=false;
                this.toggle_text="展开分类";
            }
            else {
                this.if_show_class = true;
                this.toggle_text="关闭分类";
            }
        },
        show_collec:function(thisinfo){
            console.log(this.collec.length);
            var length=this.collec.length;
            for(var i=0;i<length;i++){
                this.collec.shift();
            }
            var that = this;
            if(thisinfo!="全部"){
                setTimeout(function() {
                    reqwest('/getcollec/' + thisinfo, function (data) {
                        for (var i = 0; i < data.data.length; i++) {
                            that.collec.push(data.data[i]);
                        }
                    });
                },300);
            }
            else{
                setTimeout(function() {
                    reqwest('/getallcollec', function (data) {
                        for (var i = 0; i < data.length; i++) {
                            that.collec.push(data[i]);
                        }
                    });
                },300);
            }


        }
    }

});

var myprofile = Vue.extend({

    template: '#myprofile'

});


// 注册
// Vue.component('page-component', MyComponent);


window.onscroll=function () {
    var scrolltop = document.body.scrollTop||document.documentElement.scrollTop;
    var offheight=document.body.offsetHeight;
    var clientheight=document.documentElement.clientHeight||document.body.clientHeight;
    // mycontent.innerHTML=mycontent.innerHTML+scrolltop+"scroll<br/>";
    if(scrolltop<152){
        tabSide.style.top=(53-scrolltop/4)+"px";
        fixMenu.style.opacity=scrolltop/200;
    }
    else if(scrolltop>152){
        // MyComponent.inito();
        // MyComponent.$emit('greeting', 'hi!');
        tabSide.style.top="15px";
        fixMenu.style.opacity=0.76;
    }
};

Vue.use(VueRouter);

var router = new VueRouter();
var mymobile = Vue.extend({
    data: function() {
            return {
                sideShow:false,
                menuShow:true,
                start:{
                    x:0,
                    y:0
                },
                sideBar:false
            }
        },

    methods:{
        preventDef:function(e){
                e.preventDefault && e.preventDefault();
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = true;
                e.returnValue = false;
        },
        showSideBar:function(){
            dynamics.animate(sideBar, {
                left:-180
            }, {
                type: dynamics.spring,
                friction: 250,
                duration: 700
            });
            this.sideBar=true;
        },
        hideSideBar:function(){
            this.preventDef(e);
            // e.preventBubble();
            if(this.sideBar==true){
                dynamics.animate(sideBar, {
                    left:-360
                }, {
                    type: dynamics.spring,
                    friction: 400,
                    duration: 1200
                });
            }
        },
        startDrag: function (e) {
            // console.log(this);
            if(this.sideBar){
                // this.preventDef(e);
                e = e.changedTouches ? e.changedTouches[0] : e;
                this.start.x = e.pageX;
                this.start.y = e.pageY;
                console.log("startDrag",e.pageX,e.pageY);
            }
        },
        onDrag: function (e) {
            if(this.sideBar){
                this.preventDef(e);
                e = e.changedTouches ? e.changedTouches[0] : e;
                // console.log("onDrag",e.pageX,this.start.x);
                if(e.pageX<this.start.x){
                    if(parseFloat(sideBar.style.left)>-360) {
                        // console.log(parseFloat(sideBar.style.left) - (this.start.x - e.pageX));
                        // console.log("onDrag",e.pageX,this.start.x);
                        sideBar.style.left = (parseFloat(sideBar.style.left) - (this.start.x-e.pageX))+"px";
                        this.start.x=e.pageX;
                    }
                }
            }
        },
        stopDrag: function (e) {
            if(this.sideBar){
                // preventDef(e);
                e = e.changedTouches ? e.changedTouches[0] : e;
                console.log("stopDrag",e.pageX,e.pageY);
                if(parseFloat(sideBar.style.left)>-270) {
                    dynamics.animate(sideBar, {
                        left:-180
                    }, {
                        type: dynamics.linear,
                        duration: 1
                    });
                }
                else{
                    this.sideBar=false;
                    dynamics.animate(sideBar, {
                        left:-360
                    }, {
                        type: dynamics.spring,
                        friction: 400,
                        duration: 600
                    });
                }
            }
        }
    }
});

router.map({
    '/': {
        component: MyComponent
    },
    '/articlelist': {
        component: articleList
    },
    '/article':{
        component:myarticle
    },
    '/collec':{
        component:mycollec
    },
    '/myprofile':{
        component:myprofile
    }
});

router.start(mymobile,"#app");

// var temp = Math.ceil(Math.random()*7);
// banner.style.backgroundImage="url(images/banner"+temp+".jpg)";
// banner.style.backgroundSize="cover";
// banner.style.border="none";