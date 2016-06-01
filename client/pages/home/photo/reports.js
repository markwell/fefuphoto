Template.reports.onCreated(function() {
  this.fields = [
    {field: 'title', type: 'text', 'title': 'Название'},
    {field: 'title', type: 'textarea', 'title': 'Описание'},
    {field: 'date', type: 'date', 'title': 'Дата'}
  ];
});

Template.reports.helpers({
  reports: function() {
    return Reports.find();
  }
});


Template.reports.events({
  'click .remove-report': function(e, template) {

    e.preventDefault();
  },
  'click .edit-report': function(e, template) {
    console.log(123);
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
  },
})
