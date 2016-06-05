Template.reports.onCreated(function() {
  this.fields = [
    {field: 'title', type: 'text', 'title': 'Название'},
    {field: 'date', type: 'date', 'title': 'Дата'}
  ];
});

Template.reports.helpers({
  reports: function() {
    return Reports.find();
  },
  login: function() {return CHECKLOGIN()}
});

Template.reports.events({
  'click .remove-report': function(e, template) {
    var id = e.target.dataset.id;
    Reports.remove(id);
    e.preventDefault();
  },
  'click .edit-report': function(e, template) {
    CRUD({
      collection: Reports,
      id: e.target.dataset.id,
      title: 'Редактировать фотоотчет',
      fields: template.fields
    });
    e.preventDefault();
  },
  'click .add-report': function(e, template) {
    CRUD({
      collection: Reports,
      title: 'Создать новый фотоотчет',
      fields: template.fields
    });
    e.preventDefault();
  }
});
