Content = new Mongo.Collection('content');

Content.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW
});
