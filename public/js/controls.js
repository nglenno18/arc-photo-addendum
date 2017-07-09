var socket = io();

var user_width = 450;

var prevBoxid;
var w = 1;
var t=1;

var showSave;
socket.on('connect', function(){
  console.log(socket.id);

  $('#scale_down').on('click', function(event){
    if(user_width - 20 < 50) return user_width = 50;
    user_width = user_width - 20;

    resizeAll();
    console.log(user_width);
  });
  $('#scale_up').on('click', function(event){
    if(user_width + 20 > 800) return user_width = 800;
    user_width = user_width + 20;
    resizeAll();
  });

  var resizeAll = function(){
    var boxes = document.querySelectorAll('.uploads');
    for(var c = 0; c < boxes.length; c++){
      // console.log(boxes[c]);
      console.log(`${boxes[c].width} x ${boxes[c].height}`);
      var im = document.getElementById(boxes[c].id);
        // console.log(evt.target.naturalWidth);
        var sh = im.naturalHeight;
        var sw = im.naturalWidth;
        var scale= Math.min((user_width/sw),(user_width/sh));
        var iwScaled=sw*scale;
        var ihScaled=sh*scale;
        console.log('\n\nSCALING: ', im);
        im.width = iwScaled;
        im.height = ihScaled;
        console.log('\n\nScaled: ', im);

    }
  }

  $('#fd').on('click', function(){
    var selectedBox = document.getElementById('selectedBox');
    // if(!selectedBox) return alert('No box selected');
    $('#fd').unbind('change');

    $('#fd').on('change', function(evt){
      console.log('FD onchange executing...');
      var filledBoxes = document.querySelectorAll('.box1, .box2');
      console.log('BOXES FILLED: ', filledBoxes);
      var nextBox = "";
      filledBoxes.forEach((b)=>{
        if(nextBox != "") return;
        console.log(b.firstElementChild);
        console.log(b.firstElementChild.src);
        var sr = b.firstElementChild.src;
        // console.log(sr.substring(sr.lastIndexOf('/')));
        if(sr.substring(sr.lastIndexOf('/')) === '/temp2.png'){
          console.log('Box empty at ', b);
          return nextBox = b.id;
        }
      });

      var files = evt.currentTarget.files;
      var length = event.currentTarget.files.length;

      console.log('Files to upload: ', files);
      for(i = 0; i <(length)/2; i++){
        console.log('\n\n\n\n\nADD ROWS');
        ///read if there are any existing empy rows
        $('#add-row').click();
      }
      if(nextBox === ""){
        // console.log('\n\n\nBOXES FILLED: ', filledBoxes);
        nextBox = "box" + (filledBoxes.length+1);
        // console.log('\n\n\nNEXT BOX: ', nextBox);
      }

      console.log('NEXT Box to fill: ', nextBox);
      var boxnum = nextBox.substring(nextBox.lastIndexOf('x')+1);

      var index = parseInt(boxnum)-1;
      // var index = 0;
      console.log('For Loop (each file)');
      for(x = 0; x <= length -1; x++){
        var i = event.currentTarget.files[x];

        var i = URL.createObjectURL(i);
        var extraParams = {box: prevBoxid};
        index++;


        //GET THE ASPECT RATIO
        var h;
        var w;
        document.getElementById('box'+index).title =event.currentTarget.files[x].name;
        var parent = document.getElementById('box'+index).parentNode;
        console.log('Parent Element ', parent);
        var align = 'left';
        if(index%2 == 0) align = 'right'
        $('#box'+index).html(
          // "<a class=\"box1\" id=\"box1\" title=\"" + event.currentTarget.files[x].name +"\">"+
          "<img class=\"uploads\" id=\""+ event.currentTarget.files[x].name + "\" class=\"img\" src=\""+ i + "\" align=\""+ align +"\" border=\'1\' object-fit=\"contain\"></img>"
          // "<img class=\"img\" src=\""+ i + "\" align=\"center\" width=\"300px\" height=\"300px\" object-fit=\"contain\"></img>"
          // + "</a>"
        );


        var array = [];
        console.log(evt);

        $("body").append("<img id='hiddenImage' src='"+i+"' />");
        var width = $('#hiddenImage').width();
        var height = $('#hiddenImage').height();
        $("body").append("<canvas id='hiddenCanvas" + x + "'/>");

        var canvas = document.getElementById('hiddenCanvas' + x).getContext('2d');
        var cimg = new Image();
        cimg.onload= function(){
          // canvas.canvas.width =
          console.log('Drawing Canvas: ');
          console.log(width, height);
          console.log(cimg.height, cimg.width);
          // console.log('');
          // canvas.drawImage(cimg, 0, 0, cimg.width, cimg.width*(cimg.height/cimg.width));
          canvas.drawImage(cimg, 0, 0, cimg.width, cimg.height);
        }

        cimg.src = i;


        $('#hiddenImage').remove();
        $('#hiddenCanvas').remove();
        console.log(width, height);
        var im = document.getElementById(event.currentTarget.files[x].name);
        im.onload = function(evt){
          console.log(evt);
          console.log(evt.target.naturalHeight);
          console.log(evt.target.naturalWidth);
          var sh = evt.target.naturalHeight;
          var sw = evt.target.naturalWidth;
          var scale= Math.min((user_width/sw),(user_width/sh));
          var iwScaled=sw*scale;
          var ihScaled=sh*scale;
          console.log('\n\nSCALING: ', evt.target);
          evt.target.width = iwScaled;
          evt.target.height = ihScaled;
          console.log('\n\nScaled: ', evt.target);
        };
        console.log(im);
        var iw= im.src.width;
        console.log(im.src.naturalHeight);
        console.log(iw);
        console.log('\n\nWindow HEIGHT: ', $(window).height());
        console.log('\n\nDocument HEIGHT: ',$(document).height());
        console.log('\n\Container HEIGHT: ',$('#page-container').height());
        var height = $(document).height();
        console.log(height/.8);
        $('#page-container').height(height-200);
      }
    });
    // console.log('\n\nWindow HEIGHT: ', $(window).height());
    // console.log('\n\nDocument HEIGHT: ',$(document).height());
    // console.log('\n\Container HEIGHT: ',$('#page-container').height());
    // var height = $(document).height();
    // console.log(height/.8);
    // $('#page-container').height(height-200);
  });
});
