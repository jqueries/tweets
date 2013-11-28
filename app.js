var http 	= require('http'),
	url	 	= require('url'),
	path	= require('path'),
	fs 		= require('fs'),
	io 		= require('socket.io');

var Twitter = require('Twitter');

var twitterStreamClient = new Twitter.StreamClient(
    'eNEhRAMBnW5V1GZ4ukxExQ',
    'imvaE8nDrCaYrb6sh18zqPC1oIrQodc3SzUg7Uzitjo',
    '1577377873-KHLo7Fn0AqVYACl0H2GxRgeF6Ss7cOLMAno3RJI',
    '0XzFjUhxUSizDJdAjCJ1ikzmNe1R4rnrg9ZRMHPdzwNlj'
);

// twitterStreamClient.on('close', function() {
//     console.log('Connection closed.');
// });
// twitterStreamClient.on('end', function() {
//     console.log('End of Line.');
// });
// twitterStreamClient.on('error', function(error) {
//     console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
// });


server = http.createServer(function(request, response){

    var url_name = url.parse(request.url).pathname;  
    var extension = path.extname(url_name);
    var full_path = path.join(process.cwd(),url_name);  

    if(url_name == '/'){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Welcome, welcome! to another year at Hogwarts!");
        response.end();
    }
    else{
        fs.exists(full_path,function(exists){  
            if(!exists){  
                response.writeHeader(404, {"Content-Type": "text/plain"});    
                response.write("404 Not Found\n");    
                response.end();  
            }  
            else{  
                fs.readFile(full_path, function(error, data) {    
                    if(error) {    
                        response.writeHeader(500, {"Content-Type": "text/plain"});    
                        response.write(error.toString());    
                        response.end();    
                    }    
                    else{  
                        response.writeHeader(200, {"Content-Type": "text/html"});    
                        response.write(data);    
                        response.end();  
                    }       
                });  
            }  
        });
    }
}).listen(3333);
var socket = io.listen(server);

socket.on('connection', function(user) {
    
    user.on('search tweet', function(hashtag){
        if(hashtag.status == true){
            status = true;
            hashtag = hashtag.hashtag;

            twitterStreamClient.on('tweet', function(tweet) {
                user.emit('search result', {'tweet': tweet});
            });

            twitterStreamClient.start([hashtag]);

            
        }
        else{
            status = false;
        }
    });
});

console.log("Server running at port 3333");