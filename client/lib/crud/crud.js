var Params;
Params = {};
this.CRUD = function(params) {
  var content, f, field, fields, item, k, options, title, type, v, val, _i, _len, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
  Params = params;
  if (!params.collection) {
    return false;
  }
  item = {};
  if (params.id) {
    item = params.collection.findOne(params.id);
  } else {
    params.id = Random.id();
  }
  fields = [];
  content = '';
  _ref = params.fields;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    f = _ref[_i];
    field = f.field;
    type = (_ref2 = f.type) != null ? _ref2 : 'text';
    title = (_ref3 = f.title) != null ? _ref3 : '';
    options = (_ref4 = f.options) != null ? _ref4 : [];
    val = (_ref5 = item[field]) != null ? _ref5 : '';
    content += '<div class="form-group">';
    content += '<label>' + title + '</label>';
    if (type === 'text') {
      content += '<input class="form-control" type="text" name="' + field + '" value="' + val + '">';
    }
    if (type === 'date') {
      content += '<input class="form-control" type="date" name="' + field + '" value="' + val + '">';
    } else if (type === 'textarea') {
      content += '<textarea class="form-control" rows="15" name="' + field + '">' + val + '</textarea>';
    } else if (type === 'select') {
      content += '<select class="form-control selectpicker" name="' + field + '">';
      for (k in options) {
        v = options[k];
        content += '<option';
        if (val === k) {
          content += ' selected';
        }
        content += ' value="' + k + '">' + v + '</option>';
      }
      content += '</select>';
    }
    content += '</div>';
  }
  if ((_ref6 = params.title) == null) {
    params.title = "Редактор";
  }
  $('#crud').find('.modal-title').text(params.title);
  return $('#crud').modal().find('.modal-body').html(content);
};
Template.crud.events({
  'submit form': function(e) {
    var data, one, update, _i, _len;
    e.preventDefault();
    data = $(e.target).serializeArray();
    update = {};
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      one = data[_i];
      if (Params.save != null) {
        console.log(123);
        one.value = Params.save(one.value);
      }
      update[one.name] = one.value;
    }
    return Params.collection.upsert({
      _id: Params.id
    }, {
      $set: update
    }, function(err, res) {
      if (err) {
        return $('#crud .error').html('Ошибка!');
      } else {
        return $('#crud').delay(100).queue(function() {
          return $(this).modal('hide').dequeue();
        });
      }
    });
  }
});
