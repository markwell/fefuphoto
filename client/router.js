Router.route('/', function() {
  this.render('Home');
})

Router.route('/report/:id', function() {
  this.render('Report', {
    data: {
      id: this.params.id
    }
  });
});

Router.route('/member/:id', function() {
  this.render('member', {
    data: {
      id: this.params.id
    }
  });
});

Router._scrollToHash = function(hash) {

  var section = $(hash);
  if (section.length) {
    var sectionTop = section.offset().top;
    $("html, body").animate({
      scrollTop: sectionTop
    }, "slow");
  }
};
