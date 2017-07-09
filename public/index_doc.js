var socket = io();

socket.on('connect', function(){
  console.log(socket.id);

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
  $('#btngen').hover(function(on){
    var btn = document.getElementById('btngen');
    $('#btngen').html('<span>Generate a Download Link</span> <img float="right" src="images/generate_link_blue.png" title="upload your pdf to generate a downloadable link"/>' );
  },function(off){
      $('#btngen')
      .html('<img src="images/generate_link.png" title="upload your pdf to generate a downloadable link"/>');
  });
  $('#btngen').on('focus', function(on){
    // console.log('Focused', on.currentTarget);
    $('#btngen').css("outline", "none");
  });
  // $('#btngen').on('active', function(off){
  //   console.log('\n\nACTIVE:', off.currentTarget);
  //   $('#btngen').css("border", "1px #6bcee5 solid");
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

    var b1 = au[0];
    var b2 = au[1];
    // var sp1 = dupNode.children[0].children[1];
    // var br1 = dupNode.children[1];

    // sp1.id = sp1.id + w;
    // br1.id = br1.id +w;
    dupNode.id = dupNode.id + w;

    b1.id = "box"+ w;
    console.log(b1);
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
    // console.log('\n\nPage-Container HEIGHT: ', document.getElementById('page-container').height());

    // console.log('\n\nWindow HEIGHT: ', $(window).height());
    // console.log('\n\nDocument HEIGHT: ',$(document).height());
    // console.log('\n\Container HEIGHT: ',$('#page-container').height());
    // var height = $(document).height();
    // console.log(height/.8);
    // $('#page-container').height(height-200);
    // console.log(document.getElementById('page-container').height);
    window.scrollTo(0, 90000000000);
  });

});
