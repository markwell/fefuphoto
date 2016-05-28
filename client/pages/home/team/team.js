Template.team.helpers({
  people: function() {
    return Team.find({});
  }
});

Template.team.onRendered(function() {
  setTimeout(function() {
      $('[title]').tooltip();
  }, 500);

});
