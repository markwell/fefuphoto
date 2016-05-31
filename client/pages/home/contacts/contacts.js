NETS = {
  "vk":         "Вконтакте",
  "instagram":  "Инстаграм",
  "facebook":   "Фейсбук",
  "twitter":    "Твитер",
  "phone":      "Телефон",
  "envelope-o": "Электронная почта"
}


Template.contacts.helpers({
  contacts: function() {
    return Contacts.find({}, {sort: {rank: 1}});
  },
  sortOptions: function () {
      return {
          onSort: function(/**Event*/event) {
              console.log('Moved player #%d from %d to %d',
                  event.data.order, event.oldIndex, event.newIndex
              );
          }
      }
    },
  title: "Контакты"
});

Template.contacts.events({

  // ИЗМЕНЕНИЕ ССЫЛКИ В БД

  'focus .edit': function(e){
    var id = e.target.dataset.id;
    var baseLink = e.target.innerHTML;

    e.target.onblur = function(){
      link = e.target.innerHTML;
      if(link !== baseLink){
        document.getElementById('loader').style.display = 'block';
        Contacts.update(id,
          { $set: { value: link } }, function(err, obj) {

          }
        );
        document.getElementById('loader').style.display = 'none';
        document.getElementById('mes-edit').style.display = 'block';

        setTimeout(function(){
          document.getElementById('mes-edit').style.display = 'none';
        },1000)
      }
    }
  },

  // УДАЛЕНИЕ ИЗ БД

  'click .remove-contact': function(e){
    if (confirm("Удалить?")) {
      var id = e.target.dataset.id;
      Contacts.remove(id);
    }
  },

  // ДОБАВЛЕНИЕ В БД

  'submit #contact-add': function(e){
    e.preventDefault();
    var type = document.contactAdd.type.value;
    var link = document.contactAdd.link.value;
    var domain = link;
    if ((type != 'envelope-o')&&(type != 'phone')){
      var pattern = /http:\/\//;
      if((link.search(pattern) == -1)) {
        link = 'http://'+link;
      }
      var domain = (function(){
        var a = document.createElement('a');
        a.href = link;
        return a.hostname;
      })();
    }
    Contacts.insert(
      {
        'type' : type,
        'value' : domain,
        'href' : link,
      }
    );
  },

  'click .edit-contact': function(e) {
    CRUD({
      collection: Contacts,
      id: e.target.dataset.id,
      fields: [
        {field: 'type', type: 'select', options: NETS, title: 'Тип'},
        {field: 'value', type: 'text', title: 'Значение'},
        {field: 'href', type: 'text', title: 'Ссылка', save: checkHttp}
      ]
    });
  },
  'click .add-contact': function(e) {
    CRUD({
      collection: Contacts,
      fields: [
        {field: 'type', type: 'select', options: NETS, title: 'Тип'},
        {field: 'value', type: 'text', title: 'Значение'},
        {field: 'href', type: 'text', title: 'Ссылка'}
      ]
    });
  }
  //ОТПУСКАЕМ КЛАВИШУ МЫШИ ПРИ ПЕРЕМЕЩЕНИИ БЛОКА

  // 'mousedown .move-block': function(e){
  //
  //   e.target.onmouseout = function(){
  //     // ui = e.target;
  //     // el = ui.item.get(0);
  //     // before = ui.item.prev().get(0);
  //     // after = ui.item.next().get(0);
  //     console.log(e.target);
  //   }
  // }
});

Template.contacts.onRendered(function() {
  //ИНИЦИАЛИЗАЦИЯ SELECT BOOTSTRAP
  $('.selectpicker').selectpicker();

  //ИНИЦИЛИЗАЦИЯ СОРТИРОВКИ
  // Sortable.create(listWithHandle, {
  //   handle: '.move-block',
  //   animation: 150
  // });

  // this.$('#contacts').sortable({
  //      stop: function(e, ui) {
  //        console.log(e);
  //        console.log(ui);
  //        // get the dragged html element and the one before
  //        //   and after it
  //        el = ui.item.get(0)
  //        before = ui.item.prev().get(0)
  //        after = ui.item.next().get(0)
  //
  //        // Here is the part that blew my mind!
  //        //  Blaze.getData takes as a parameter an html element
  //        //    and will return the data context that was bound when
  //        //    that html element was rendered!
  //        if(!before) {
  //          //if it was dragged into the first position grab the
  //          // next element's data context and subtract one from the rank
  //          newRank = Blaze.getData(after).rank - 1
  //        } else if(!after) {
  //          //if it was dragged into the last position grab the
  //          //  previous element's data context and add one to the rank
  //          newRank = Blaze.getData(before).rank + 1
  //        }
  //        else
  //          //else take the average of the two ranks of the previous
  //          // and next elements
  //          newRank = (Blaze.getData(after).rank +
  //                     Blaze.getData(before).rank)/2
  //
  //        //update the dragged Item's rank
  //        Contacts.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
  //      }
  //  })
});

var checkHttp = function(val) {
  var pattern = /http:\/\//;
  if((val.search(pattern) == -1)) {
    val = 'http://'+val;
  }
  return val;
}
