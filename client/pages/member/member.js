Template.member.helpers({
  member: function() {
    return Team.findOne(this.id);
  },
  reports: function() {
    return Reports.find({'photographer':this.id});
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
    // console.log(Reports.find({'photographer':this.id}).fetch());
    return res;
  }
});
