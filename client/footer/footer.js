Template.footer.helpers({
  copyright: function() {
    return Content.findOne('copyright');
  },
  logo: 'img/watermark.png'
})
