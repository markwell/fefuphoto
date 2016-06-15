Contacts = new Mongo.Collection('contacts');

Contacts.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW
});
