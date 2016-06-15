Reports = new Mongo.Collection('reports');

Reports.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW
});
