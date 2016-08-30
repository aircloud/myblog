/**
 * Created by hh on 16/8/2016.
 */
$().ready(function(){
   var iflast=0;
   var timestamp = (new Date()).valueOf();
   var myarticle = Backbone.Model.extend({
       defaults:function(){
           return{
               id:timestamp,
               pass:"",
               title:"",
               tag:"",
               content:""
           }
       },
       url:"/savemyarticle"
   });

   var myshort = Backbone.Model.extend({
       defaults:function(){
           return{
               id:timestamp,
               pass:"",
               title:"",
               tag:"",
               content:""
           }
       },
       url:"/savemyshort"
   }) ;

    var mycollec = Backbone.Model.extend({
        defaults:function(){
            return{
                id:timestamp,
                pass:"",
                title:"",
                tag:"",
                content:""
            }
        },
        url:"/savemycollec"
    }) ;


    var router = Backbone.Router.extend({
        routes:{
            "mycollec/edit":"collecshow",
            "myshort/edit":"shortshow",
            "myarticle/edit":"articleshow"

        },

        collecshow:function(){
         console.log(3);
            if(iflast==1){
                $("#input300").val(lastpass);
                $("#input301").val(lasttitle);
                $("#input302").val(lasttag);
                $("#input303").val(lastcontent);
            }
            $("#edit_article3").css('display',"block");
            $("#edit_article").css('display',"none");
            $("#edit_article2").css('display',"none");
            $("#li1").removeClass("active");
            $("#li2").removeClass("active");
            $("#li3").addClass("active");
        },

        shortshow:function(){
            if(iflast==1){
                $("#input200").val(lastpass);
                $("#input201").val(lasttitle);
                $("#input202").val(lasttag);
                $("#input203").val(lastcontent);
            }
            console.log(2);
            $("#edit_article2").css('display',"block");
            $("#edit_article").css('display',"none");
            $("#edit_article3").css('display',"none");
            $("#li1").removeClass("active");
            $("#li3").removeClass("active");
            $("#li2").addClass("active");
        },

        articleshow:function(){
            if(iflast==1){
                $("#input00").val(lastpass);
                $("#input01").val(lasttitle);
                $("#input02").val(lasttag);
                $("#input03").val(lastcontent);
            }
            console.log(1);
            $("#edit_article").css('display',"block");
            $("#edit_article2").css('display',"none");
            $("#edit_article3").css('display',"none");
            $("#li3").removeClass("active");
            $("#li2").removeClass("active");
            $("#li1").addClass("active");

        }

    });
    var route1 = new router();
    Backbone.history.start();

    //这里从session先获得一些数据
    if( sessionStorage.getItem(  "pass" )){
        // $("#input00").val(sessionStorage.getItem(  "pass" ));
        iflast=1;
        var lastpass = sessionStorage.getItem(  "pass" );
        var lasttitle = sessionStorage.getItem(  "title" );
        var lasttag = sessionStorage.getItem(  "tag" );
        var lastcontent = sessionStorage.getItem(  "content" );
    }


   $("#submit_article").bind("click",function(){
       var myArticle = new myarticle();
       var pass = $("#input00").val();
       var title = $("#input01").val();
       var tag = $("#input02").val();
       var source_content = $("#input03").val();
       var content = $("#toinsert").html();
       myArticle.set({
           title:title,
           tag:tag,
           pass:pass,
           content:content,
           source_content:source_content
       });
       console.log(myArticle);
       myArticle.save({},{success:function(model, response){
           sessionStorage.setItem( "pass", pass );
           sessionStorage.setItem( "title", title );
           sessionStorage.setItem( "tag", tag );
           sessionStorage.setItem( "content", source_content );
           alert("保存成功");
       }});
       return false;
   });
    $("#submit_article2").bind("click",function(){
        var myShort = new myshort();
        var pass = $("#input200").val();
        var title = $("#input201").val();
        var tag = $("#input202").val();
        var source_content = $("#input203").val();
        var content = $("#toinsert").html();
        myShort.set({
            title:title,
            tag:tag,
            pass:pass,
            content:content,
            source_content:source_content
        });
        console.log(myShort);
        myShort.save({},{success:function(model, response){
            sessionStorage.setItem( "pass", pass );
            sessionStorage.setItem( "title", title );
            sessionStorage.setItem( "tag", tag );
            sessionStorage.setItem( "content", source_content );
            alert("保存成功");
        }});
        return false;
    });
    $("#submit_article3").bind("click",function(){
        var myCollec = new mycollec();
        var pass = $("#input300").val();
        var title = $("#input301").val();
        var tag = $("#input302").val();
        var content = $("#input303").val();
        myCollec.set({
            title:title,
            tag:tag,
            pass:pass,
            content:content
        });
        console.log(myCollec);
        myCollec.save({},{success:function(model, response){
            sessionStorage.setItem( "pass", pass );
            sessionStorage.setItem( "title", title );
            sessionStorage.setItem( "tag", tag );
            sessionStorage.setItem( "content", content );
            alert("保存成功");
        }});

        return false;
    })
});