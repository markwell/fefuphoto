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
