Team = new Mongo.Collection('team');

Team.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW
});
