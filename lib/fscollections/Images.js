var base = "";
if (Meteor.isServer) {
  base = process.env.PWD;
}

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: base+"/.img"})]
});

Images.allow({
  update: ALLOW,
  remove: ALLOW,
  insert: ALLOW,
  download: function() {
    return true;
  }
});
