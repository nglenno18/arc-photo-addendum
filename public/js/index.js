var socket = io();
var prevBoxid;
var w = 1;
var t=1;

socket.on('connect', function(){
  console.log(socket.id);
  function animate(u, times, interv){
        var myVar =
        setTimeout(function(){
          //  alert(u);
          console.log(u);
          if(u <= times/2)$('#progress').fadeTo('slow', 0.0).fadeTo('slow', 1.0);

           if(u==times){
             clearTimeout(myVar);
            //  $('#tarea').fadeTo('slow', 0.0).fadeTo('slow', 1.0);
            $('#tarea').css("border", "1px black solid");
            $('#btncopy').css("border", "1px black solid");
            $('#btncopy').css("border-left", "none");
            $('#tarea').css("border-right", "none");
            $('#tarea').css("height", "27px");
            $('#progress').fadeTo('slow', 0.0);
             if(!$('#progress').hasClass("hide")){
               $('#progress').addClass("hide");
             }
             return;
           }
          animate(u+1, times, interv);
        },interv);
   }

   $('#fd').on('click', function(){
     var selectedBox = document.getElementById('selectedBox');
     console.log('clicked');
     // if(!selectedBox) return alert('No box selected');
     $('#fd').unbind('change');

     $('#fd').on('change', function(evt){
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

       var boxnum = nextBox.substring(nextBox.lastIndexOf('x')+1);

       var index = parseInt(boxnum)-1;
       // var index = 0;
       for(x = 0; x <= length -1; x++){
         var i = event.currentTarget.files[x];
         var name = i.name;
         // console.log(i);
         i = URL.createObjectURL(i);
         var img = new Image();
         // img.src = "data:image/png;base64," + event.srcElement.files[x].toString('Base64');
         // img.src = "data:image/png;base64," + i.toString('base64');

         var extraParams = {box: prevBoxid};
         index++;

         // delivery.send(evt.currentTarget.files[0], extraParams);
         // delivery.on('send.success', function(fileUID){
         //   console.log('FILEUID: ', fileUID);
         //   console.log('File was successfully sent!');
         //   // $('#box2-image').attr("src", fileUID.name);
         // });
         var h;
         var w;
        //  $('#box'+index).html('<img class="img" class="uploads" src="' + i + '"/>');
         $('#box'+index).html('<img class="uploads" id=\"'+name+'\" src="' + i + '"/>');
       }
     });
   });

   var u=1; //i is the start point 1 to 12 that is

  socket.on('uploadProgress', function(percent){
    // console.log(percent);
    $('#progress').text(percent + '%');
    document.title = Math.round(percent) + '% uploading';
    if(percent === '100'){
      if(!$('#progress').hasClass("hide")){
        $('#progress').addClass("hide");
      }
      var pr = $('#property-label').text();
      if(pr.substring(0, 4) === "Type"){
        document.title = 'Arc Addendum';
      }else if(pr.substring(0, 8) === "Property"){
        document.title = 'Arc Addendum';
      }else{
        document.title = pr;
      }

      // var i = 0;
      $('#progress').css("margin-right", "20px");
      $('#progress').css("margin-top", "4px");
      $('#progress').css("font-weight", "bold");
      // $('#progress').css("color", "#6bcee5");
      $('#progress').css("color", "green");
      $('#progress').css("font-size", "150%");
      // $('#tarea').addClass('highlighted');
      $('#tarea').css("border", "2px #6bcee5 solid");
      $('#tarea').css("border-right", "none");
      $('#btncopy').css("border", "2px #6bcee5 solid");
      $('#btncopy').css("border-left", "none");
      // $('#progress').css("", "2px 2px grey");
      animate(u, 6, 600)
      //ADD THE CSS PROGRESS LABEL CLASS
      //put the progress label INSIDE the btngen
    }
  });

  socket.on('successfulUpload', function(filename){
    $('.genbutton').attr('disabled', 'disabled').text('Uploading File...');
    // console.log(filename);
    var newname = filename.replace(" ", "%20");
    var extraParams = {
      "property": newname
    }
    var newlink = window.location + extraParams.property;
    newlink = newlink.replace("#top", "");
    // console.log(newlink);
    // $('#linklabel').removeClass("hide");

    $('#tarea').fadeTo('slow', 0.0).removeClass("hide").fadeTo('slow', 1.0);
    $('#btncopy').fadeTo('slow', 0.0).removeClass("hide").fadeTo('slow', 1.0);
    $('#progress').fadeTo('slow', 0.0).removeClass("hide").fadeTo('slow', 1.0);

    $('#tarea').text(newlink);
    $('#tarea').attr("title", newlink);
    // console.log(newlink);
    $('#linklabel').text(newlink);
    $('.genbutton').removeAttr('disabled').text('');
    $('.genbutton')
    .html('<img src="images/generate_link.png" title="upload your pdf to generate a downloadable link"/>');
    return console.log(document.getElementById('tarea'));
  });

  var delivery = new Delivery(socket);

  delivery.on('delivery.connect', function(delivery){
    $('#uploadpdf').on('click', function(){
      window.scrollTo(0, 90000000000);

      console.log('clicked');
      $('#uploadpdf').unbind('change');
      $('#uploadpdf').on('change', function(evt){
        if($('#progress').hasClass("hide")){
          $('#progress').removeClass("hide");
        }
        $('#uploadform').submit();
        // socket.emit('uploadpdf', function(){
        //   console.log('\n\n\nuploaded');
        // });
      });
    });


    $('#pdfupload').on('click', function(evt){
      $('#pdfupload').unbind('change');

      try{
        $('#pdfupload').on('change', function(evt){
          $('.genbutton').attr('disabled', 'disabled').text('Uploading File...');
          var files = evt.currentTarget.files[0];
          console.log(files);
          var filename = files.name.substring(0, files.name.lastIndexOf('.'));
          console.log(filename);
          var newname = filename.replace(" ", "%20");
          var extraParams = {
            "property": newname
          }
          delivery.send(files, extraParams);
          delivery.on('send.success', function(fileUID){

            // console.log(window.location);
            // var newlink = window.location + extraParams.property;

            var newlink = window.location + extraParams.property;
            newlink = newlink.replace("#top", "");
            console.log(newlink);
            // $('#linklabel').removeClass("hide");
            $('#tarea').removeClass("hide");
            $('#btncopy').removeClass("hide");
            $('#tarea').text(newlink);
            $('#tarea').attr("title", newlink);
            // console.log(newlink);
            $('#linklabel').text(newlink);
            $('.genbutton').removeAttr('disabled').text('');
            $('.genbutton')
            .html('<img src="images/generate_link.png" title="upload your pdf to generate a downloadable link"/>');

            return console.log(document.getElementById('tarea'));
          });
        });
      }catch(e){
        $('.genbutton').removeAttr('disabled').text('');
        $('.genbutton')
        .html('<img src="images/generate_link.png" title="upload your pdf to generate a downloadable link"/>');
      }
    });

    $('#btncopy').hover(function(on){
      // console.log(on.currentTarget.childNodes[0]);
      on.currentTarget.childNodes[0].src = "images/copy_link_blue2.png";
    }, function(off){
      off.currentTarget.childNodes[0].src = "images/copy_link.png";
    });
    $('#btncopy').on('active', function(on){
      // console.log('Active', on.currentTarget);
      // $('.genbutton').css("border", "1px #6bcee5 solid");
      $('#tarea').css("border", "1px #6bcee5 solid");
    });
    $('#print').hover(function(on){
      // console.log('Active', on.currentTarget);
      var icon = document.getElementById('topdf_icon');
      icon.src = "images/topdf_blue.png";
    }, function(off){
      var icon = document.getElementById('topdf_icon');
      icon.src = "images/topdf_grey.png";
    });
  });




  socket.on('image', function(info){
    var correctBox = document.getElementById('selectedBox');
    // console.log('\n\n\nINFO: ', info);
    // console.log('SELECTED BOX: ', correctBox);
    if(correctBox) correctBox.id = info.params.box;

    var box = info.params.box;
    var ctx =$('#'+ box)[0].firstElementChild;
    console.log(ctx);
    // ctx = ctx.getContext('2d');
    if(info.image){
      var img = new Image();
      img.src = 'data:image/jpeg;binary,'+info.buffer;
      // console.log("IMAGE received from server for box#: ", box);

      $('#'+box).html('<img class="img" class="uploads" src="data:image/jpg;base64,' + info.buffer + '" />');

      $('#add-images').css('display', 'none');
    }
  });

  $('#info-icon').on('click', function(){
    if($('#bubble').css("display") == "none"){
      $('#bubble').removeClass("hide");
      $('#bubble').addClass("speech");
    }else{
      $('#bubble').removeClass("speech");
      $('#bubble').addClass("hide");
    }
  });

  $('#delete-row').on('click', function(i){
    console.log('DELETE Row!!', w);
    var au = document.getElementById('au' + w);
    console.log(au);
    au.parentNode.removeChild(au);

    w-=2;
    console.log($('#photocount')[0].firstChild.textContent = (w+1) + " ");
    if(!document.getElementById('au3')){
         return $('#delete-row').css('display', 'none');
    }
    if(!document.getElementById('box38') || !document.getElementById('box39')){
      $('#png').removeAttr("disabled").css("cursor", "auto");
      $('#jpeg').removeAttr("disabled").css("cursor", "auto");
    }
  });

  var tempbtn = "";
  $('.genbutton').hover(function(on){
    var btn = document.getElementById('btngen');
    $('.genbutton').html('<span>Generate a Download Link</span> <img float="right" src="images/generate_link_blue.png" title="upload your pdf to generate a downloadable link"/>' );
  },function(off){
      $('.genbutton')
      .html('<img src="images/generate_link.png" title="upload your pdf to generate a downloadable link"/>');
  });
  $('.genbutton').on('focus', function(on){
    // console.log('Focused', on.currentTarget);
    $('.genbutton').css("outline", "none");
  });
  // $('.genbutton').on('active', function(off){
  //   console.log('\n\nACTIVE:', off.currentTarget);
  //   $('.genbutton').css("border", "1px #6bcee5 solid");
  // });

  $('#add-images').hover(function(i){
    console.log('button.hover');
    var icon = document.getElementById('add-icon');
    // console.log(icon);
    icon.src = "images/multi-select-blue.png";
  }, function(o){
    var icon = document.getElementById('add-icon');
    icon.src = "images/multi-select.png";
  });
  $('#add-row').hover(function(i){
    console.log('button.hover');
    var icon = document.getElementById('downarrow');
    // console.log(icon);
    icon.src = "images/expandarrow-blue.png";
  }, function(o){
    var icon = document.getElementById('downarrow');
    icon.src = "images/expandarrow.png";
  });

  $('#delete-row').hover(function(i){
    console.log('button.hover');
    var icon = document.getElementById('uparrow');
    // console.log(icon);
    icon.src = "images/uparrow-blue.png";
  }, function(o){
    var icon = document.getElementById('uparrow');
    icon.src = "images/uparrow.png";
  });

  $('#info-icon').hover(function(i){
    console.log('button.hover');
    var icon = document.getElementById('info-icon');
    // console.log(icon);
    icon.src = "images/info-blue.png";
  }, function(o){
    var icon = document.getElementById('info-icon');
    icon.src = "images/info.png";
  });

  $('#logo').click(function(i){
     window.open("http://www.arcvendormgmt.com/");
  });

  var before = "";
  $('#property-label').on('focus', function() {
    before = $(this).html();
  }).on('blur keyup paste', function() {
    if (before != $(this).html()) { $(this).trigger('change'); }
  });
  $('#property-label').on('change', function(){
    console.log('CHANGE PROPERTY COLOR');
    var typing = $(this)[0].textContent;
    if(typing.substring(0, 4) != 'Type' && typing != "Property Address"){
      $(this).css("color", "#6bcee5");
    }
  });
  $('#property-label').on("focusout", function() {
    if($(this)[0].textContent.length === 0){
      $(this)[0].textContent = "Property Address";
      $(this).css('color', 'lightgrey');
    }
  })

  $('#add-row').on('click', function(i){
    w+=2;
    console.log('ADD a new Row!!', w);
    var n = document.getElementById('au'); //returns a HTML DOM Object
    // console.log(n);
    var dupNode = n.cloneNode(true);
    // console.log(dupNode);
    var au = dupNode.children[0].children;
    console.log('\n\nAU: ', au);

    var textboxes = dupNode.getElementsByTagName('input');
    for(x = 0; x <= textboxes.length; x++){
      if(textboxes[x]){
        if(textboxes[x].getAttribute("type")){
          textboxes[x].value = "";
        }
      }
    }
    // console.log('TEXT DESCs: ', textboxes);

    var b1 = dupNode.children[0].children[0].children[0];
    var b2 = dupNode.children[0].children[2].children[0];
    var sp1 = dupNode.children[0].children[1];
    var br1 = dupNode.children[1];
    // console.log('BREAK???: ', br1);
    // console.log('SPACE??? ', sp1);
    //
    // console.log('BOX!: ', b1);
    // console.log('BOX2: ', b2);
    sp1.id = sp1.id + w;
    br1.id = br1.id +w;
    dupNode.id = dupNode.id + w;

    b1.id = "box"+ w;
    var b1img = b1.getElementsByClassName('img')[0];
    // console.log('IMAGE: ', b1img);
    if(b1img){
      b1img.src = 'images/temp2.png';
    }


    b2.id = "box"+ (w+1);
    var b2img = b2.getElementsByClassName('img')[0];
    // console.log('IMAGE: ', b2img);
    if(b2img){
      b2img.src = 'images/temp2.png';
    }

    var doc = document.getElementById("page-container");
    doc.appendChild(dupNode);
    // console.log(dupNode);
    if(document.getElementById('box38') || document.getElementById('box39')){
      $('#png').attr("disabled", "disabled").css("cursor", "not-allowed");
      $('#jpeg').attr("disabled", "disabled").css("cursor", "not-allowed");
    }
    if(document.getElementById('au3')){
      console.log('SHOULD ENABLE delete-row button');
      $('#delete-row').css('display', 'inline-block');
      $('#delete-row img').css('display', 'inline-block');
    }
    // document.append(dupNode);
    // $('#photocount').html("<label class=\"bottom\" id=\"photocount\">" + (w+1) + " <span>images</span></label>");
    console.log($('#photocount')[0].firstChild.textContent = (w+1) + " ");
    window.scrollTo(0, 90000000000);
  });


  // $('#printdoc').on('click', function(ev){
  //   console.log('Print page was clicked', ev.id);
  //   var property = $('#property-label')[0].textContent;
  //   console.log(property);
  //   var lastBox = "";
  //   var lastContainer = "";
  //   if(property == 'Type Property Address'){
  //     var p = prompt('Enter Property Address: ', 'type address here');
  //     console.log('PROMPT RESPONSE: ', p);
  //     if(!p){
  //       return p;
  //     }else{
  //       $('#property-label')[0].textContent = p;
  //       $('#property-label').css("color", "#6bcee5");
  //       property = p;
  //     }
  //   }
  //
  //   $("#page-container").removeClass("box-shadow");
  //   $('#mid-body').addClass("hide");
  //   var instruction = document.getElementById("instruction");
  //   instruction = instruction.getElementsByTagName("sup");
  //   console.log('Instructions: ', instruction);
  //   var insContent = instruction[0].textContent;
  //   console.log('Instructional content: ', insContent);
  //   instruction[0].textContent = '';
  //   lastBox = document.getElementsByClassName("box2");
  //   var isEmpty = lastBox[lastBox.length-1].getElementsByTagName("img")[0].src;
  //   if(isEmpty.substring(isEmpty.lastIndexOf("/")+1) === "temp2.png"){
  //     console.log('\n\nHIDE LAST BOX');
  //     lastBox = lastBox[lastBox.length-1].id;
  //     console.log(document.getElementById(lastBox).parentElement);
  //     lastContainer = document.getElementById(lastBox).parentElement;
  //     lastContainer.id = "txtID";
  //     $('#'+ lastContainer.id).addClass("hide");
  //   }
  //   console.log(lastBox);
  //   console.log('IS EMPTY: ', isEmpty);
  //   if(!$('#bubble').hasClass("hide")){
  //     $('#bubble').addClass("hide");
  //   }
  //   $('footer').addClass("hide");
  //   $('#photocount').addClass("hide");
  //   $('#backtotop').addClass("hide");
  //   document.title = property;
  //
  //   $("#page-container").wordExport();
  //
  //   // window.print();
  //   // window.title = 'ARC Addendum';
  //   $("#page-container").addClass("box-shadow");
  //   $('#mid-body').removeClass("hide");
  //   $('#'+lastContainer.id).removeClass("hide");
  //   $('#'+lastContainer.id).removeAttr("id");
  //   instruction[0].textContent = insContent;
  //   $('footer').removeClass("hide");
  //   $('#photocount').removeClass("hide");
  //   $('#backtotop').removeClass("hide");
  //
  //   $('#add-row').click();
  //   $('#delete-row').click();
  // })
});
