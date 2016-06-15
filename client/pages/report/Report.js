
Template.Report.helpers({
  report: function() {
    return Reports.findOne(this.id);
  },
  photos: function() {
    return Images.find({report: this.id});
  },
  login: function() {return ALLOW()}
});

Template.Report.events({
  'click .remove': function(e){
      var id = e.target.dataset.id;
      Images.remove(id, function(err,res){
      });
  },
  'mouseover .dropzone': function(e) {
    ReportId = this.id;
  },
  'change input': function(e) {
    reportId = this.id;
    var files = e.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      file = new FS.File(files[i]);
      file.report = reportId;
      Images.insert(file, function (err, res) {
        console.log('Загружено');
      });
    }
  }
});
Template.Report.onRendered(function(e) {
  initPhotoSwipeFromDOM('.my-gallery');
});
