/**
 * Created by hh on 12/8/2016.
 */
var query=require("./mysql_pool");
var app = require("../app");


module.exports = {

    getdata: function (req, res, next) {
        query("select * from myblog_info ", function (err, vals, fields) {
            //其他信息
            console.log(vals);
            res.json(vals);
            // console.log(fields);
        });
    },
    getshort:function(req,res,next){
        console.log(req.query);
        var begin = req.query.page;
        begin = parseInt(begin)*9-9;
        var end = parseInt(begin) + 9;
        var sort = req.query.sort_by;
        var myquery;
        if(sort!=""){
            sort=sort.split(",");
            if(sort[0]=="tag")
            myquery = "select * from myblog_short where tag like '%"+sort[1]+"%' order by id DESC";
            else if(sort[0]=="all")
            myquery =  "select * from myblog_short where tag like '%"+sort[1]+"%' OR title like '%"+sort[1]+"%' OR describes like '%"+sort[1]+"%' order by id DESC" ;
        }
        else
            myquery = "select * from myblog_short order by id DESC";
        console.log(myquery);
        query(myquery,function(err, value, fields){

            console.log(typeof value);
            var return_value = {
                "total_count":0, "incomplete_results":false
            };
            return_value['items']=[];
            if(value[0]!=null) {
                if (value.length) {
                    return_value.total_count = value.length;
                    for (var i = begin; i < end; i++) {
                        if (value[i]) {
                            value[i].tag = value[i].tag.split(",");
                            return_value.items.push(value[i]);
                        }
                    }
                }
            }
            res.json(return_value);

        });
    },
    getshortContent:function(req,res,next){
        console.log(req.params.id);
        var myquery = "select * from myblog_short where ID='"+req.params.id+"'";
        query(myquery,function(err,value,fields){
            console.log(value);
            value[0].tag=value[0].tag.split(",");
            res.json(value[0]);
        });
    },
    gettags:function(req,res,next){
        var myquery = "select tag from `myblog_article` ";
        query(myquery,function(err,value,fields){
            var return_value = [];
            if(value[0]!=null){
                if(value.length){
                    for(var i =0;i<value.length;i++){
                        value[i]=value[i].tag.split(",");
                        for(var j=0;j<value[i].length;j++){
                            if(return_value.indexOf(value[i][j])===-1){
                                return_value.push(value[i][j]);
                            }
                            else{

                            }
                        }
                    }
                }
            }

            console.log(return_value);
            res.json({"data":return_value,"len":return_value.length});
        });
    },
    getlistbytag:function(req,res,next){
        var myquery = "select * from myblog_article where tag like '%"+req.params.tag+"%'";
        query(myquery,function(err,value,fields){
            console.log(value);
            res.json({"data":value});
        });
    },
    getarticlebyid:function(req,res,next){
        var myquery = "select * from myblog_article where ID = "+req.params.id;
        query(myquery,function(err,value,fields){
            console.log(value);
            res.json({"data":value[0]});
        });
    },
    getarticlelist:function(req,res,next){
        var myquery = "select `title` ,`tag` ,`year` ,`month` ,`time` ,`ID`  FROM `myblog_article` order by ID DESC";
        var return_value={};
        return_value.data=[];
        return_value.year=[];
        query(myquery, function (err, value, fields) {
                if(value[0]!=null&&value.length) {
                    return_value.number=value.length;
                    for (var i = 0; i < value.length; i++) {
                        value[i].tag=value[i].tag.split(",");
                        if(return_value.year.indexOf(value[i]['year'])===-1){
                            console.log('new');
                            var this_item={};
                            this_item.year=value[i]['year'];
                            this_item.article=[];
                            this_item.article.push(value[i]);
                            return_value.data.push(this_item);
                            return_value.year.push(value[i]['year']);
                        }
                        else{
                            var dex = return_value.year.indexOf(value[i]['year']);
                            return_value.data[dex].article.push(value[i]);
                        }
                    }
                }
                console.log(return_value);
                res.json(return_value);
            })
    },

    getactivearticle:function(req,res,next){
        var myquery = "select * from myblog_article where ID = "+req.params.id;
        var myquery2 = "select * from myblog_article  where ID >"+req.params.id+" order by ID";
        var myquery3 = "select * from myblog_article  where ID <"+req.params.id+" order by ID desc";
        var return_value={};
        query(myquery,function(err,value,fields){
            if(value[0]!=null) {
                return_value.title = value[0].title;
                return_value.time = value[0].time;
                return_value.content = value[0].content;
                return_value.tag_tran = value[0].tag;
                return_value.id = value[0].ID;
                return_value.nex = {};
                return_value.pre = {};
                query(myquery2, function (err2, value2, fields2) {
                    if (value2[0]!=null) {
                        return_value.nex.title = value2[0].title;
                        return_value.nex.id = value2[0].ID;
                    }
                    else {
                        return_value.nex.title = "没有下一篇了";
                        return_value.nex.id = return_value.id;
                    }
                    query(myquery3, function (err3, value3, fields3) {
                        if (value3[0]!=null) {
                            return_value.pre.title = value3[0].title;
                            return_value.pre.id = value3[0].ID;
                        }
                        else {
                            return_value.pre.title = "没有上一篇了";
                            return_value.pre.id = return_value.id;
                        }
                        res.json({"item": return_value});
                    });
                });
            }
            else{
                res.json({"item": return_value});
            }
        });
    },
    getindexarticle:function(req,res,next){
        var myquery = "select * from myblog_article order by ID DESC";
        var number = req.params.id;
        query(myquery,function(err,value,fields){
            console.log(value);
            if(number<value.length) {
                value[number].over=0;
                res.json(value[number]);
            }
            else{
                res.json({"over":1});
            }
        });
    },
    getcollectags:function(req,res,next){
        var myquery = "select tag from myblog_collec";
        var return_value = [];
        query(myquery,function(err,value,fields){
            for(var i =0;i<value.length;i++){
                value[i]=value[i].tag.split(",");
                for(var j=0;j<value[i].length;j++){
                    if(return_value.indexOf(value[i][j])===-1){
                        return_value.push(value[i][j]);
                    }
                    else{

                    }
                }
            }
            res.json({"data":return_value,"len":return_value.length});
        });
    },
    getcollec:function(req,res,next){
        var myquery = "select * from myblog_collec where tag like '%"+req.params.tag+"%'";
        query(myquery,function(err,value,fields){
            console.log(value);
            res.json({"data":value});
        });
    },
    getallcomment:function(req,res,next){
        var id = req.query.id;
        var myquery = "select `name` ,`time` ,`comment`,`email` from myblog_comment where target_id = "+id;
        query(myquery,function(err,value,fields){
            res.json(value);
        })
    },
    savecomment:function(req,res,next){
        console.log("comment");
        console.log(req.body);
        var name = req.body.name;
        if(name=="")name="匿名用户";
        var time = req.body.time;
        var comment = req.body.comment;
        var email = req.body.email;
        var target_id = req.body.target_id;

        var myquery = "insert into myblog_comment (`name`,`time` ,`comment`,`email`,`target_id`) VALUES ('"+name+"','"+time+"','"+comment+"','"+email+"','"+target_id+"')";
        console.log(myquery);
        query(myquery,function(err,value,fields){
            res.end();
        })
    },
    searcharticle:function(req,res,next){
        var keyword =req.params.keyword;
        var myquery = "select * from myblog_article where tag like '%"+keyword+"%' or content like '%"+keyword+"%' or title like '%"+keyword+"%'";
        console.log(myquery);
        query(myquery,function(err,value,fields){
            var return_value = {"type":"文章",data:[]};
            if(value) {
                if (value[0] != null) {
                    for (var i = 0; i < value.length; i++) {
                        return_value.data[i]={};
                        return_value.data[i].title = String(value[i].title);
                        return_value.data[i].content = String(value[i].content);
                        var toreplace = new RegExp(keyword,"g");
                        return_value.data[i].title=return_value.data[i].title.replace(toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].content=return_value.data[i].content.replace( toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].content=return_value.data[i].content.slice(0,80)+"......";
                        return_value.data[i].tourl = "article.html#article/" + value[i].ID;
                    }
                }
            }
            res.json(return_value);
        })
    },
    searchshort:function(req,res,next){
        var keyword =req.params.keyword;
        var myquery = "select * from myblog_short where tag like '%"+keyword+"%' or content like '%"+keyword+"%' or title like '%"+keyword+"%'";
        console.log(myquery);
        query(myquery,function(err,value,fields){
            var return_value = {"type":"轻博客",data:[]};
            if(value) {
                if (value[0] != null) {
                    for (var i = 0; i < value.length; i++) {
                        return_value.data[i]={};
                        return_value.data[i].title = String(value[i].title);
                        return_value.data[i].content = String(value[i].content);
                        var toreplace = new RegExp(keyword,"g");
                        return_value.data[i].title=return_value.data[i].title.replace(toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].content=return_value.data[i].content.replace( toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].tourl = "search/"+keyword;
                    }
                }
            }
            res.json(return_value);
        })
    },
    searchcollec:function(req,res,next){
        var keyword =req.params.keyword;
        var myquery = "select * from myblog_collec where title like '%"+keyword+"%' or url like '%"+keyword+"%'";
        console.log(myquery);
        query(myquery,function(err,value,fields){
            var return_value = {"type":"我的收藏",data:[]};
            if(value) {
                if (value[0] != null) {
                    for (var i = 0; i < value.length; i++) {
                        return_value.data[i]={};
                        return_value.data[i].title = String(value[i].title);
                        return_value.data[i].content = String(value[i].url);
                        var toreplace = new RegExp(keyword,"g");
                        return_value.data[i].title=return_value.data[i].title.replace(toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].content=return_value.data[i].content.replace( toreplace, "<span style='color:red'>" + keyword + "</span>");
                        return_value.data[i].tourl = value[i].url;
                    }
                }
            }
            res.json(return_value);
        })
    },
    savemyarticle:function(req,res,next){
        console.log(req.body);
        var content = req.body.content;
        content = content.replace(/'/g,'\"');
        var id = req.body.id;
        var pass = req.body.pass;
        var date = new Date();
        var year = date.getFullYear();
        var month=date.getMonth()+1;
        var tag = req.body.tag;
        var title = req.body.title;
        var mytime=(new Date()).toLocaleString();
        var myquery = "select  *  from myblog_article where title = '"+title+"' OR timeid = '"+id+"'";
        if(pass=="646691993") {
            console.log("ok0...");
            query(myquery, function (err, value, fields) {
                console.log(value);
                var myquery2;
                if (value[0] == null) {
                    myquery2 = "insert into myblog_article (`title`,`tag` ,`content` ,`timeid` ,`time`,`year`,`month`) VALUES('" + title + "','" + tag + "','" + content + "','" + id + "','" + mytime + "','" + year + "','" + month + "')";
                    console.log(myquery2);
                } else {
                    // myquery2 = "insert into myblog_article (`title`,`tag` ,`content` ,`timeid` ,`time`,`year`,`month`) VALUES('" + title + "','" + tag + "','" + content + "','" + id + "','" + mytime + "','" + year + "','" + month + "')";
                    myquery2 = "update myblog_article set title = '" + title + "',tag = '" + tag + "',content = '" + content + "' where timeid = '" + id + "'";
                    console.log(myquery2);
                }
                query(myquery2, function (err, value, fields) {
                    if(myquery2.slice(0,1)=="i")
                    {
                        var myquery3="UPDATE `myblog_info` SET `article_number` = `article_number` + 1;";
                        query(myquery3,function(err,vaulue2,fields){
                            res.json(value);
                        });
                    }
                    res.json(value);
                });
            });
        }
        else{
            res.end();
        }
    },
    savemyshort:function(req,res,next){
        console.log(req.body);
        var content = req.body.content;
        content = content.replace(/'/g,'\"');
        var id = req.body.id;
        var pass = req.body.pass;
        var describes = req.body.content.slice(0,80)+"......";
        var tag = req.body.tag;
        var title = req.body.title;
        var mytime=(new Date()).toLocaleString();
        var myquery = "select  *  from myblog_short where title = '"+title+"' OR timeid = '"+id+"'";
        if(pass=="646691993") {
            console.log("ok...");
            query(myquery, function (err, value, fields) {
                console.log(value);
                var myquery2;
                if (value[0] == null) {
                    myquery2 = "insert into myblog_short (`title`,`tag` ,`content` ,`timeid` ,`time`,`describes`) VALUES('" + title + "','" + tag + "','" + content + "','" + id + "','" + mytime +"','"+describes+"')";
                    console.log(myquery2);
                } else {
                    console.log(title);
                    myquery2 = "update myblog_short set title = '" + title + "',tag = '" + tag + "',content = '" + content +  "',describes = '" + describes + "' where timeid = '" + id + "'";
                    console.log(myquery2);
                }
                query(myquery2, function (err, value, fields) {
                    if(myquery2.slice(0,1)=="i")
                    {
                        var myquery3="UPDATE `myblog_info` SET `s_article_number` = `s_article_number` + 1;";
                        query(myquery3,function(err,vaulue2,fields){
                            res.json(value);
                        });
                    }
                    res.json(req.body);
                });
            });
        }
        else{
            res.end();
        }
    },
    savemycollec:function(req,res,next){
        console.log(req.body);
        var content = req.body.content;
        content = content.replace(/'/g,'\"');
        var id = req.body.id;
        var pass = req.body.pass;
        var tag = req.body.tag;
        var title = req.body.title;
        var mytime=(new Date()).toLocaleString();
        var myquery = "select  *  from myblog_collec where timeid = '"+id+"'";
        if(pass=="646691993") {
            console.log("ok...");
            query(myquery, function (err, value, fields) {
                console.log(value);
                var myquery2;
                if (value[0] == null) {
                    myquery2 = "insert into myblog_collec (`title`,`tag` ,`url` ,`timeid`) VALUES('" + title + "','" + tag + "','" + content + "','" + id + "')";
                    console.log(myquery2);
                } else {
                    myquery2 = "update myblog_collec set title = '" + title + "',tag = '" + tag + "',url = '" + content + "' where timeid = '" + id + "'";
                    console.log(myquery2);
                }
                query(myquery2, function (err, value, fields) {
                    res.json(value);
                });
            });
        }
        else{
            res.end();
        }
    },
    savemycollec2:function(req,res,next){
        console.log(req.body);
        var content = req.body.content;
        content = content.replace(/'/g,'\"');
        var id = req.body.id;
        var pass = req.body.pass;
        var tag = req.body.tag;
        var title = req.body.title;
        var mytime=(new Date()).toLocaleString();
        var myquery = "select  *  from myblog_collec where timeid = '"+id+"'";
        if(pass=="646691993") {
            console.log("ok...");
            query(myquery, function (err, value, fields) {
                console.log(value);
                var myquery2;
                if (value[0] == null) {
                    myquery2 = "insert into myblog_collec (`title`,`tag` ,`url` ,`timeid`) VALUES('" + title + "','" + tag + "','" + content + "','" + id + "')";
                    console.log(myquery2);
                } else {
                    myquery2 = "update myblog_collec set title = '" + title + "',tag = '" + tag + "',url = '" + content + "' where timeid = '" + id + "'";
                    console.log(myquery2);
                }
                query(myquery2, function (err, value, fields) {
                    res.json(value);
                });
            });
        }
        else{
        res.end();
        }
    },
    getsomearticle:function(req,res,next){
        var number =req.params.number;
        var max_number = number+3;
        var myquery = "select * from myblog_article order by ID DESC LIMIT "+number+","+max_number;
        query(myquery,function(err, value, fields){
            for(var i =0;i<value.length;i++){
                value[i].content=value[i].content.slice(0,400);
            }
            res.json(value);
        });
    },
    getallarticle:function(req,res,next){
        var myquery = "select * from myblog_article order by ID DESC";
        query(myquery,function(err, value, fields){
            for(var i =0;i<value.length;i++){
                value[i].content=value[i].content.slice(0,500);
            }
            res.json(value);
        });
    },
    getallcollec:function(req,res,next){
        var myquery = "select * from myblog_collec order by ID DESC";
        query(myquery,function(err, value, fields){
            res.json(value);
        });
    },
    addvisit:function(req,res,next){
        var myquery3="UPDATE `myblog_info` SET `visitors` = `visitors` + 1;";
        query(myquery3,function(err,value,fields){
            res.json(value);
        });
    }
};