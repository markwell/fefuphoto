Template.contacts.helpers({
  contacts: function() {
    return Contacts.find();
  },
  nets: [
      {'type': 'vk'},
      {'type': 'instagram'},
      {'type': 'facebook'},
      {'type': 'twitter'},
      {'type': 'phone'},
      {'type': 'envelope-o'},
  ],
  title: "Контакты"
});

Template.contacts.events({
  'focus .edit': function(e){
    var id = e.target.dataset.id;
    var baseLink = e.target.innerHTML;

    e.target.onblur = function(){
      link = e.target.innerHTML;
      if(link !== baseLink){
        document.getElementById('loader').style.display = 'block';
        Contacts.update(id,
          { $set: { 'value': link },function(err, obj)
          {

          }
        });
        document.getElementById('loader').style.display = 'none';
        document.getElementById('mes-edit').style.display = 'block';

        setTimeout(function(){
          document.getElementById('mes-edit').style.display = 'none';
        },5000)
      }
    }
  },

  'click .remove-contact': function(e){
      var id = e.target.dataset.id;
      Contacts.remove(id);
  },

  'submit #contact-add': function(){
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
      'href' : link
      }
    );
  }
});
