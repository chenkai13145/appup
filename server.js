var express = require('express');
var port = 8088;

var app = express();

var router = express.Router();
router.get('/', function(req,res,next){
	req.url = '/index.html';
	next();
});

app.use(router);



// 接口数据
// 1、读取json数据
var goods = require("./data/goods.json")
var coment = require("./data/coment.json")
var famliy = require("./data/famliy.json")

// 2、路由
var routes = express.Router();

// 3、编写接口
routes.get('/goods', (req,res) => {
	res.json(goods);
});
routes.get('/coment', (req,res) => {
	res.json(coment);
});

routes.get('/famliy', (req,res) => {
	res.json(famliy);
});


app.use('/api',routes);


// 定义static目录，指向./dists目录
app.use(express.static('./dists'));


// 启动express
module.express = app.listen(port, function(err){
	if(err){
		console.log(err);
		return;
	}
	
	console.log('http://localhost:' + port + '\n');
});
