Template.team.onCreated(function() {
  this.fields = [
    {field:'avatar', type: 'file', title: 'Фото'},
    {field:'name', type: 'text', title: 'Имя'},
    {field:'post', type: 'text', title: 'Должность'},
    {field:'description', type: 'textarea', title: 'Описание'},
    {field:'net.vk', type: 'text', title: 'Ссылка vk.com'},
    {field:'net.instagram', type: 'text', title: 'Ссылка instagram'},
    {field:'net.facebook', type: 'text', title: 'Ссылка facebook'},
    {field:'net.twitter', type: 'text', title: 'Ссылка twitter'},
    // {field:'order', type: 'text', title: 'Оставьте пустым'}
  ]
});

Template.team.helpers({
  team: function() {
    return Team.find({}, {sort: {order: 1}});
  },
  login: function() {return CHECKLOGIN()},
  photo: function(id) { return CrudFiles.findOne(id); },
  // console.log(Team.find());
  // networks: function(id) { return Team.findOne(id); }
  getNets: function(nets) {
    res = [];
    for(net in nets) {
      val = nets[net];
      if (val) {
        res.push({href: val, type: net});
      }
    }

    return res;
  }
});

Template.team.onRendered(function() {
  setTimeout(function() {
    $('[title]').tooltip();
    team = $('#team-list').get(0);
    s = new Sortable(team, {
      handle: '.move-block',
      animation: 150,
      onEnd: function() {
        var i = 0;
        $("#team-list").children().each(function() {
          id = $(this).data('id');
          Team.update(id,{$set: {order: i}});
          i++;
        });
      }
    });
  }, 500);
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

  // добавление фотографии
  'click .photo-person': function(e, template) {
    var id = e.target.dataset.id;
    // Team.remove(id);
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
