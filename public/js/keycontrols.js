  $(document).keydown(function(evt){
    if(evt.ctrlKey){
      var code = evt.keyCode;
      switch (code) {
        case 77:                          //m
          evt.preventDefault();
          $('#add-images').click();
          break;
        case 40:                          //downarrow
          evt.preventDefault();
          $('#add-row').click();
          console.log(`WINDOW HEIGHT: `, document.height);
          window.scrollTo(0, 90000000000);
          // $.scrollTo($('#add-row').data("scrollTo"));
          break;
        case 38:                          //uparrow
          evt.preventDefault();
          if(document.getElementById('au3')){
            $('#delete-row').click();
          }
          break;
        case 83:                          //S
          evt.preventDefault();
            $('#print').click();
          break;
        case 73:                          //i
          evt.preventDefault();
          alert('To print to pdf, right-click the page, select print, and change the print destination to "Save as PDF"');
          break;
        default:

      }
    }else if(evt.shiftKey){
      var code = evt.keyCode;
      switch(code){
        case 191:                          //?
          evt.preventDefault();
          alert('Hold Shift/+ to upload Images\n'+
                'Press the + and - keys to scale the photos\n'+
                'Save a PDF (highest quality) or Word Document\n'+
                'Upload a PDF or Doc file to get a download link for distribution');
          break;
        case 107:                          //-
          evt.preventDefault();
          alert('To print to pdf, right-click the page, select print, and change the print destination to "Save as PDF"');
          break;
      }
    }else if(evt.keyCode == 107){
      $('#scale_up').click();
      console.log(evt);
    }else if(evt.keyCode == 109){
      $('#scale_down').click();
    }
  });
