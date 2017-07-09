const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

var fs = require('fs-extra');
var dl = require('delivery');
var formidable = require('formidable');

var util = require('util');
var socketid = '';
var percentcompleted = '';
// var HtmlDocx = require('html-docx-js');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);


app.get('/:id', function(request, response){
  // console.log(request.params.id);
  // response.send(request.params);
  var id= request.params.id;

  try{
    id = id.replace("#top", "");
    console.log('ID: ', id);
  }catch(e){

  }

  console.log(path.join(__dirname));
  // console.log(__dirname.substring(0, __dirname.lastIndexOf('server')));
  // var dir = __dirname.substring(0, __dirname.lastIndexOf('server'));
  var files = fs.readdirSync(__dirname);
  var adds = [];
  files.forEach((file)=>{
    // console.log(file);

    var str = file.substring(file.lastIndexOf('.') + 1).toUpperCase();
    // console.log(str);
    if(str === 'PNG' || str === 'JPG' || str === 'PDF'){
      // console.log(str);
      // console.log(file);
      adds.push(file);
      // var filename = file.substring(0, file.lastIndexOf('.'));
      var filename = file.toString();
      console.log('Filename:', filename);
      console.log('URL REQUEST ID: ', id);
      if(filename === id){
      console.log('\n\n\nFOUND FILE!!!: ', file);
      return response.download('server/' + file);
      }
      // else{
      //   return response.set('We\'re Sorry, the file you have request either does not exist or has been removed');
      // }
    }
  });
});

io.on('connection', (socket)=>{
  console.log(`\n\nNew User Connected: \n\t(socket.id):${socket.id}`);
  socketid = socket.id;

  var delivery = dl.listen(socket);
  delivery.on('receive.success', function(file){
    var params = file.params;
    // var buf = file.buffer.toString('binary');
    // socket.emit('image', { image: true, buffer: file.buffer.toString('base64'), params:params});
    console.log(file);
    fs.writeFile(__dirname+'/'+file.name, file.buffer, function(err){
      if(err) console.log('FILE FAILED TO SAVE ONTO SERVER');
      else{
        console.log('FILE SAVED ON SERVER');
      }
    });
    fs.readFile(__dirname + file.name, function(err, buf){
    console.log('\n\nPARAMS: box', params);
    // it's possible to embed binary data
    // within arbitrarily-complex objects
    // socket.emit('image', { image: true, buffer: file.buffer.toString('base64'), params:params});
    console.log('image file is initialized');
  });
  });

  app.post('/upload', function(req, res){
    console.log('Form SUBMITTED');
    var form = new formidable.IncomingForm();
    console.log(this.socketid);
    form.parse(req, function(err, fields, files) {
      res.end();
    });

    form.on('fileBegin', function(name, file){
      // file.path = '../';
      console.log(file.path);
    })
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        // console.log(io.sockets.socket(socketid));
        if(percent_complete.toFixed(0) != percentcompleted){
          percentcompleted = percent_complete.toFixed(0);
          io.to(socketid).emit('uploadProgress', percent_complete.toFixed(2));
        }

        // console.log(percent_complete.toFixed(2));
        // socket(this.socketid).emit('uploadProgress', percent_complete.toFixed(2));
        // socketIO.sockets.socket(this.socketid).emit('uploadProgress', percent_complete.toFixed(2));
    });

    form.on('error', function(err) {
        console.error(err);
    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'c:/localhost/nodejs/';
        console.log(this.openedFiles[0]);
        var f = this.openedFiles[0];

        console.log(temp_path, file_name, new_location);
        // fs.copy(f.name, f.buffer, 'utf8', function(err){
        //   if(err){
        //     console.log(err);
        //   }else {
        //     console.log('success');
        //   }
        // })
        fs.copy(temp_path, 'server/' + file_name, function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
                io.to(socketid).emit('uploadProgress', '100');
                io.to(socketid).emit('successfulUpload', file_name);
            }
          });

        console.log('\n\nSUCCESS');
        console.log(socketid);
        console.log(io.sockets.sockets);
      });

    return;
  });
});

server.listen(port, function(){
  console.log(`Server is up and running on port: ${port}`);
});
