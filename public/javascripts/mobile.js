/**
 * Created by hh on 21/8/2016.
 */
var sideBar = document.getElementById('side');
var mycontent=document.getElementById("mycontent");
var tabSide =document.getElementById("tab_side");
var fixMenu = document.getElementById("fix_menu");

function preventDef(e){
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
}

Vue.use(VueRouter);

var MyComponent = Vue.extend({
    template: '#indexpage',

    data: function() {
        return {
            show1: true,
            article:[]
        }
    },

    ready:function(){
        console.log("hello created");
        var that = this;
        reqwest('/getsomearticle', function (data) {
            console.log(data);
            // var mydata=JSON.stringify(data);
            console.log(data[0]);
            for (var i = 0; i < 5; i++) {
                that.article.push(data[i]);
            }
            console.log("article",that.article);
        });
        setTimeout(function(){
            this.article=that.article;
            console.log(this.article);
        },2000);
        // setTimeout(function(){console.log(that.article)},3000);
        // setTimeout(function(){console.log(this.article)},3000);
        // that.article=[{title:"this is a title",content:"this is a content"},{title:"this is a title",content:"this is a content"}];
    },
    created: function() {

    },
    methods:{
        inito:function(){
            console.log("init");
            console.log(this.article);
        },
        handcroll:function(){
            console.log("scroll");
        }
    }
});


var articleList = Vue.extend({

    template: '#article_list'

});

// 注册
Vue.component('page-component', MyComponent);

var vm = new Vue({
    // 选项
    el : '#app',

    // component:MyComponent,

    data:{
        sideShow:false,
        menuShow:true,
        start:{
            x:0,
            y:0
        },
        sideBar:false,
    },

    methods:{
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
            preventDef(e);
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
            if(this.sideBar){
                // preventDef(e);
                e = e.changedTouches ? e.changedTouches[0] : e;
                this.start.x = e.pageX;
                this.start.y = e.pageY;
                console.log("startDrag",e.pageX,e.pageY);
            }
        },
        onDrag: function (e) {
            if(this.sideBar){
                preventDef(e);
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

window.onscroll=function () {
    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
    // mycontent.innerHTML=mycontent.innerHTML+scrolltop+"scroll<br/>";
    if(scrolltop<152){
            tabSide.style.top=(53-scrolltop/4)+"px";
            fixMenu.style.opacity=scrolltop/200;
    }
    else if(scrolltop>152){
        tabSide.style.top="15px";
        fixMenu.style.opacity=0.76;
    }
};

var router = new VueRouter();
// var mymobile = Vue.extend({});

router.map({
    '/index': {
        component: MyComponent
    },
    '/articlelist': {
        component: articleList
    }
});

router.start(vm,{

});