<script src="/js/libs/dom-to-image.js"></script>

  var node = document.body;
  var htmlimage;
  l = { orientation: 'p', unit: 'pt', format: 'a3', compress: true, fontSize: 8, lineHeight: 0, autoSize: false, printHeaders: true, pagesplit: true };
  var doc = new jsPDF(l);

  // $('#pdf').click(function(){
  //   doc.addHTML($('#page-container'),0,0,{pagesplit:true},function() {
  //      doc.save('CDC.pdf');
  //    });
  // });

  // doc.addHTML($('elementHTML'),{format:'png',pagesplit: true}});
    var pdf = new jsPDF('p','pt','a4');

    $('#png').click(function() {
      console.log('PNG...');
      domtoimage.toBlob(document.body)
      .then(function (blob) {
        window.saveAs(blob, 'my-node.png');
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
    });

    $('#jpeg').click(function() {
      console.log('JPEG...');
      domtoimage.toJpeg(document.body, { quality: .95 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'photo_addendum.jpeg';
          link.href = dataUrl;
          link.click();
      }).catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
    });
