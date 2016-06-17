Template.contacts.onCreated(function() {
  // определяем поля для формы
  this.fields = [
    {field: 'type', type: 'select', options: NETS, title: 'Тип'},
    {field: 'name', type: 'text', title: 'Название'},
    {field: 'href', type: 'text', title: 'Ссылка или номер'},
  ];
})


Template.contacts.helpers({
  // получаем контакты
  contacts: function() {
    return Contacts.find({}, {sort: {order: 1}});
  },
  //возвращаем ссылку без http волшебством JS
  getLink: function (link) {
    var a = document.createElement('a');
    a.href = link;
    return a.hostname;
  },
  title: "Контакты",
  // проверки на тип
  isPhone: function(type) { return (type == 'phone') ? true : false; },
  isMail: function(type) { return (type == 'envelope-o') ? true : false; },
  isNet: function(type) { return (type != 'phone' && type != 'envelope-o') ? true : false; },
  //проверяем права
  login: function() {return CHECKLOGIN()}
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
  'click .edit-contact': function(e, template) {
    CRUD({
      collection: Contacts,
      title: "Редактировать контакт",
      id: e.target.dataset.id,
      fields: template.fields
    });
  },

  // создание контакта
  'click .add-contact': function(e, template) {
    CRUD({
      collection: Contacts,
      title: 'Создать новый контакт',
      fields: template.fields,
      allowEditOrder: true
    });
  }
});

Template.contacts.onRendered(function() {

    contacts = $('#contacts-list').get(0);
    s = new Sortable(contacts, {
      handle: '.move-block',
      animation: 150,
      onEnd: function() {
        var i = 0;
        $("#contacts-list").children().each(function() {
          id = $(this).data('id');
          Contacts.update(id,{$set: {order: i}});
          i++;
        });
      }
    });

});


// функция для проверки http:// (пока не работает)
var checkHttp = function(val) {
  var pattern = /http:\/\//;
  if((val.search(pattern) == -1)) {
    val = 'http://'+val;
  }
  return val;
}
