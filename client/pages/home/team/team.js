Template.team.helpers({
  people: function() {
    return Team.find({});
  }
});

Template.team.onRendered(function() {
  setTimeout(function() {
      $('[title]').tooltip();
  }, 500);
  var Dropzone = require("dropzone");
});

Template.team.events({
  'click .collapse-btn-link': function(e){
    e.preventDefault();
    $("#net-link").css("display", "block");
  }
});
