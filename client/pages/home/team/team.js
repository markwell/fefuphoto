Template.team.onCreated(function() {
  this.fields = [
    {field:'name', type: 'text', title: 'Имя'},
    {field:'post', type: 'text', title: 'Должность'},
    {field:'description', type: 'textarea', title: 'Описание'},
    {field:'net.vk', type: 'text', title: 'Ссылка vk.com'},
    {field:'net.instagram', type: 'text', title: 'Ссылка instagram'}
  ]
});

Template.team.helpers({
  people: function() {
    return Team.find();
  }
});

Template.team.onRendered(function() {
  setTimeout(function() {
    $('[title]').tooltip();
  }, 500);
  var Dropzone = require("dropzone");
});

Template.team.events({
  'click .collapse-btn-link': function(e){
    e.preventDefault();
    $("#net-link").css("display", "block");
  },

  // удаление участника
  'click .remove-person': function(e, template) {
    var id = e.target.dataset.id;
    Team.remove(id);
    e.preventDefault();
  },

  // добавление участника
  'click .add-person': function(e, template) {
    CRUD({
      collection: Team,
      title: 'Добавить нового участника',
      fields: template.fields
    });
  },

  // редактирование участника
  'click .edit-person': function(e, template) {
    CRUD({
      collection: Team,
      id: e.target.dataset.id,
      title: 'Редактировать участника',
      fields: template.fields
    });
  }
});
