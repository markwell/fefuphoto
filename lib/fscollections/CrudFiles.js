var base = "";
if (Meteor.isServer) {
  base = process.env.PWD;
}

CrudFiles = new FS.Collection("crud-files", {
  stores: [new FS.Store.FileSystem("crud-files", {path: base+"/.crud"})]
});

CrudFiles.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW
});
