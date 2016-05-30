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
  // 'focus .edit': function(e){
  //     alert('privet');
  // },
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
