Template.reports.onCreated(function() {
  this.fields = [
    {field:'avatar', type: 'file', title: 'Обложка фотоотчета'},
    {field: 'title', type: 'text', 'title': 'Название'},
    {field: 'description', type: 'textarea', 'title': 'Описание'},
    {field: 'photographer', type: 'select', 'title': 'Фотограф', options: function() {
      team = Team.find({}, {fields: {_id:1, name:1}}).fetch();
      obj = {}
      obj[''] = "-- не выбран --"
      team.forEach(function(one) {
        obj[one._id] = one.name;
      })
      return obj;
    } },
    {field: 'date', type: 'date', 'title': 'Дата', default: moment().format('YYYY-MM-DD')}
  ];
  Session.set('reportsLimit', 3);
});

Template.reports.onRendered(function() {
  if(!this._rendered) {
    $('#reports-list').get(0);
    reports = $('#reports-list').get(0);
    s = new Sortable(reports, {
      handle: '.move-block',
      animation: 150,
      onEnd: function() {
        var i = 1;
        $("#reports-list").children().each(function() {
          id = $(this).data('id');
          Reports.update(id,{$set: {order: i}});
          i++;
        });
      }
    });
  }
});

Template.reports.helpers({
  reports: function() {
    return Reports.find({}, {sort: {order: 1}, limit: Session.get('reportsLimit')});
  },
  more: function() {
    if (Session.get('reportsLimit') < Reports.find().count()) {
      return true;
    } else {
      return false;
    }
  },
  photo: function(id) {
    if (!id) return false;
    return CrudFiles.findOne(id);
  },
    login: function() {return CHECKLOGIN()}
  });

  Template.reports.events({
    'click .remove-report': function(e, template) {
      var id = e.target.dataset.id;
      Reports.remove(id);
      e.preventDefault();
    },
    'click .edit-report': function(e, template) {
      CRUD({
        collection: Reports,
        id: e.target.dataset.id,
        title: 'Редактировать фотоотчет',
        fields: template.fields
      });
      e.preventDefault();
    },
    'click .add-report': function(e, template) {
      // length = Reports.find().count();
      // Session.set('reportsLimit', length+1);
      CRUD({
        collection: Reports,
        title: 'Создать новый фотоотчет',
        fields: template.fields,
        allowEditOrder: true
      });
      e.preventDefault();
    },
    'click .show-nextReports': function(e, template){
      Session.set('reportsLimit', Session.get('reportsLimit')+6);
    },
    'click .hide-reports': function(e) {
      Session.set('reportsLimit', 3);
    }

  });
