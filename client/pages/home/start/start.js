Template.start.onCreated(function() {
  this.fields = [
    {field: 'quote', type: 'textarea', 'title': 'Цитата'},
    {field: 'author', type: 'textarea', 'title': 'Автор'}
  ];
});

Template.start.helpers({
  bgimage: function functionName() {
    return Images.findOne('bgimage');
  },
  startblock: function() {
    return Content.findOne('startblock');
  },
  login: function() {return CHECKLOGIN()}
});

Template.start.events({
  'click .edit-start': function(e, template) {
    CRUD({
      collection: Content,
      id: 'startblock',
      title: 'Редактировать',
      fields: template.fields
    });
    e.preventDefault();
  },
  'click .edit-bgimage': function(e, template) {
    $('#add-bg-img').click();
    e.preventDefault();
  },
  'change input': function(e) {
    var files = e.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      file = new FS.File(files[i]);
      file._id = 'bgimage';
      console.log(file);
      Images.remove('bgimage');
      Images.insert(file, function (err, res) {
        console.log('Загружено');
      });
    }
  }
});
