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
  'change input': function(e) {
    console.log(e);
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


console.log(initPhotoSwipeFromDOM);


// execute above function
Template.Report.onRendered(function() {
  setTimeout(function() {
      initPhotoSwipeFromDOM('.my-gallery');
      console.log(123);
  }, 1000);

});


/*СКРИПТ DRUG'N'DROP В РАЗДЕЛЕ "EDITMEMBERS"*/
// Sortable.create(simpleList, {animation: 500});
