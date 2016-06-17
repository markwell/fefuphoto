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
  ];
  Session.set('teamLimit', 4);
});

Template.team.helpers({
  team: function() {
    return Team.find({}, {sort: {order: 1}, limit: Session.get('teamLimit')});
  },
  more: function() {
    return Session.get('teamLimit') < Team.find().count();
  },
  readNext: function (description) {
    return description.length > 39;
  },
  login: function() {return CHECKLOGIN()},
  photo: function(id) { return CrudFiles.findOne(id); },
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
  if(!this._rendered) {
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
  }
});

Template.team.events({
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
      fields: template.fields,
      allowEditOrder: true
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
  },

  //обработка события при нажатии на кнопку "смотреть далее"
  'click .show-nextMembers': function(e, template){
    Session.set('teamLimit', Team.find().count());
  },
  'click .hide-Members': function(e) {
    Session.set('teamLimit', 4);
  }
});
