Template.footer.onCreated(function() {
  this.fields = [
    {field: 'text', type: 'textarea', 'title': 'Copyright'}
  ];
});

Template.footer.helpers({
  copyright: function() {
    return Content.findOne('copyright');
  },
  logo: '/img/watermark.png',
  login: function() {return CHECKLOGIN()}
})

Template.footer.events({
  'click .edit-footer': function(e, template) {
    console.log(Content.findOne('startblock'));
    CRUD({
      collection: Content,
      id: 'copyright',
      title: 'Редактировать',
      fields: template.fields
    });
    e.preventDefault();
  }
});
