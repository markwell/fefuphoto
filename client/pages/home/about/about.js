Template.about.onCreated(function() {
  this.fields = [
    {field: 'text', type: 'textarea', 'title': 'Содержание'}
  ];
});

Template.about.helpers({
  title: "О нас",
  text: function() {
    return Content.findOne('about');
  }
});

Template.about.events({
  'click .edit-about': function(e, template) {
    CRUD({
      collection: Content,
      id: 'about',
      title: 'Редактировать текст',
      fields: template.fields
    });
    e.preventDefault();
  }
});
