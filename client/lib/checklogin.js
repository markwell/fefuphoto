CHECKLOGIN = function() {
  if (Meteor.userId() === "RcRDF5d5zNh2W6BAz") {
      return Meteor.userId();
    }
    return false;
}
