Template.about.helpers({
  title: "О нас",
  text: function() {
    return Content.findOne('about');
  }
});
