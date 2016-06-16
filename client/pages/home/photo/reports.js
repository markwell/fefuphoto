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
    {field: 'date', type: 'date', 'title': 'Дата'}
  ];
  Session.set('reportsLimit', 3);
});

Template.reports.onRendered(function() {
  if(!this._rendered) {
    // setTimeout(function() {
      if (Reports.find().count() <= 3){
        console.log(Reports.find().count());
        $('.show-nextReports').css("display", "none");;
      }
    // },2000)
    $('#reports-list').get(0);
    reports = $('#reports-list').get(0);
    s = new Sortable(reports, {
      handle: '.move-block',
      animation: 150,
      onEnd: function() {
        var i = 0;
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
  photo: function(id) { return CrudFiles.findOne(id); },
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
    length = Reports.find().count();
    Session.set('reportsLimit', length+1);
    CRUD({
      collection: Reports,
      title: 'Создать новый фотоотчет',
      fields: template.fields,
      allowEditOrder: true
    });
    e.preventDefault();
  },
  'click .show-nextReports': function(e, template){
    length = Reports.find().count();
    if (Session.get('reportsLimit') <= length) {
      Session.set('reportsLimit', Session.get('reportsLimit')+6);
    } else {
      Session.set('reportsLimit', 3);
      $('.show-nextReports').text('Смотреть далее');
    }
    if (Session.get('reportsLimit') > length) {
      $('.show-nextReports').text('Скрыть');
    }
  }
});
