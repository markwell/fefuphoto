Template.reports.onCreated(function() {
  this.fields = [
    {field:'avatar', type: 'file', title: 'Обложка фотоотчета'},
    {field: 'title', type: 'text', 'title': 'Название'},
    {field: 'description', type: 'textarea', 'title': 'Описание'},
    {field: 'photographer', type: 'text', 'title': 'Фотограф'},
    {field: 'date', type: 'date', 'title': 'Дата'}
  ];
});

Template.reports.helpers({
  reports: function() {
    return Reports.find();
  },
  photo: function(id) { return CrudFiles.findOne(id); },
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
