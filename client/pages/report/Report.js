
Template.Report.helpers({
  report: function() {
    return Reports.findOne(this.id);
  },
  reportDate: function(date) {
    return moment(date).locale('ru').format('dddd, DD MMMM');
  },
  photographer: function (memberID) {
    return (memberID) ? Team.findOne(memberID) : false;
  },
  photos: function() {
    return Images.find({report: this.id});

  },
  login: function() {return CHECKLOGIN()},
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
      });
    }
  }
});
Template.Report.onRendered(function(e) {
  if(!this._rendered) {
    initPhotoSwipeFromDOM('.my-gallery');
  }
});
