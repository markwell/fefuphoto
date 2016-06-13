Template.member.helpers({
  member: function() {
    return Team.findOne({'avatar':this.id});
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
