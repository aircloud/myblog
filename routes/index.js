var express = require('express');
var router = express.Router();
var index_control  = require("../controller/index.control");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/short',function(req,res,next){
  console.log(__dirname);
  res.redirect('short.html');
});

router.get("/shortthis/:id",index_control.getshortContent);

router.get("/getshort",index_control.getshort);

router.get("/index",index_control.getdata);
router.get("/getdata",index_control.getdata);

router.get("/gettags",index_control.gettags);
router.get("/getlistbytag/:tag",index_control.getlistbytag);
router.get("/getarticlebyid/:id",index_control.getarticlebyid);
router.get("/getarticlelist",index_control.getarticlelist);

router.get("/getactivearticle/:id",index_control.getactivearticle);
router.get("/getindexarticle/:id",index_control.getindexarticle);
router.get("/getcollectags",index_control.getcollectags);
router.get("/getcollec/:tag",index_control.getcollec);

router.get("/getallcomment",index_control.getallcomment);
router.post("/savecomment",index_control.savecomment);

router.get("/searcharticle/:keyword",index_control.searcharticle);
router.get("/searchshort/:keyword",index_control.searchshort);
router.get("/searchcollec/:keyword",index_control.searchcollec);
router.put("/savemyarticle",index_control.savemyarticle);
router.put("/savemyshort",index_control.savemyshort);
router.put("/savemycollec",index_control.savemycollec);


router.post("/savemycollec",index_control.savemycollec2);


router.get("/getsomearticle/:number",index_control.getsomearticle);
router.get("/getallarticle",index_control.getallarticle);
router.get("/getallcollec",index_control.getallcollec);

router.get("/addvisit",index_control.addvisit);

router.post("/file_upload",multipartMiddleware,index_control.file_upload_handle);

module.exports = router;
