Template.member.helpers({
  member: function() {
    return Team.findOne(this.id);
  },
  reports: function() {
    return Reports.find({'photographer':this.id},{sort: {date: -1}});
  },
  reportDate: function(date) {
    return moment(date).locale('ru').format('MMMM DD, dd');
  },
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
