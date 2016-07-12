Router.route('/', function() {
  this.render('Home');
})

Router.route('/postSubmit', function() {
  this.render('postSubmit');
})

Router.route('/postsList', function() {
  this.render('postsList');
})

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.configure({
  loadingTemplate: 'loading'
});

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
