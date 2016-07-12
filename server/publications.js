Meteor.publish('Team', function() {
  return Team.find();
});
Meteor.publish('Contacts', function() {
  return Contacts.find();
});
Meteor.publish('Reports', function() {
  return Reports.find();
});
Meteor.publish('Content', function() {
  return Content.find();
});
Meteor.publish('Images', function() {
  return Images.find();
});
Meteor.publish('CrudFiles', function() {
  return CrudFiles.find();
});
Meteor.publish('Posts', function() {
  return Posts.find();
});
