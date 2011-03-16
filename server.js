var http = require('http');
var url = require('url');
var fs = require('fs');

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

  
http.createServer(function (req, res) {
   var path = url.parse(req.url).pathname;
   console.log(path);
   
   if(path == '/mhantalk'){
   	fs.readFile(__dirname + '/WebContent/index.html', function(err, data){
        if (err) return send404(res);
        res.writeHead(200)
        res.write(data, 'utf8');
        res.end();
      });
   }else if(path.indexOf('/mhantalk/target') == 0){
   		req.on('data',function(data){
	  		console.log('url >>>>>>>>>>>'+ path.replace('/mhantalk/target',''));
	  		console.log('header >>>>' + JSON.stringify(req.headers));
	  		var options = {host: 'hantalk.hansol.net',
						  port: 80,
						  path: path.replace('/mhantalk/target',''),
						  method: req.method,
						  headers: req.headers};
			//console.log(JSON.stringify(options));
	    	var request = http.request(options,
		  		function(response){
		  			var statusCode = response.statusCode;
		  			var headers = response.headers;
		    		response.on('data',function(chunk){
		    		console.log('>>>'+chunk);
		    			res.writeHead(statusCode,headers);
		    			res.write(chunk);
		    			console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
		    			res.end();
		    		
		    		});
		    	
		    	}
	    	);
	    	
			//console.log(request);
	    	request.write(data);
	    	request.end();
	    });
   }else{
    console.log(__dirname + '/WebContent'+ path);
   	fs.readFile(__dirname + '/WebContent'+ path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200)
        res.write(data, 'utf8');
        res.end();
      });
      
   }
   
   
   
  	

}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
