Template.contacts.helpers({
  contacts: function() {
    return Contacts.find({}, {sort: {rank: 1}});
  },
  title: "Контакты"
});

Template.contacts.events({

  // Удаление контакта
  'click .remove-contact': function(e){
    if (confirm("Удалить?")) {
      var id = e.target.dataset.id;
      Contacts.remove(id);
    }
  },

  // радактирование контакта
  'click .edit-contact': function(e) {
    CRUD({
      collection: Contacts,
      title: "Редактировать контакт",
      id: e.target.dataset.id,
      fields: [
        {field: 'type', type: 'select', options: NETS, title: 'Тип'},
        {field: 'value', type: 'text', title: 'Название/номер'},
        {field: 'href', type: 'text', title: 'Ссылка (если есть)'}
      ]
    });
  },

  // создание контакта
  'click .add-contact': function(e) {
    CRUD({
      collection: Contacts,
      title: 'Создать новый контакт',
      fields: [
        {field: 'type', type: 'select', options: NETS, title: 'Тип'},
        {field: 'value', type: 'text', title: 'Название/номер'},
        {field: 'href', type: 'text', title: 'Ссылка (если есть)'}
      ]
    });
  }
});

Template.contacts.onRendered(function() {
});

var checkHttp = function(val) {
  var pattern = /http:\/\//;
  if((val.search(pattern) == -1)) {
    val = 'http://'+val;
  }
  return val;
}
