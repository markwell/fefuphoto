
Template.Report.helpers({
  report: function() {
    return Reports.findOne(this.id);
  },
  photos: function() {
    return Images.find({report: this.id});
  }
});

Template.Report.events({
  'click .remove': function(e){

    if(confirm("Удалить?")) {
      var id = e.target.dataset.id;
      Images.remove(id, function(err,res){
      });
    }
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
  // $('.dropzone').dropzone({
  //   accept: function(file, done) {
  //     file = new FS.File(file);
  //     file.report = ReportId;
  //     Images.insert(file, function (err, res) {
  //       done();
  //     });
  //   }
  // });
  initPhotoSwipeFromDOM('.my-gallery');
});
