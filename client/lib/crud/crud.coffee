Params = {}
Files = {}

@CRUD = (params) ->
  Files = {}
  Params = params

  # если нет коллекции
  if !params.collection
    return false

  # если передан/не передан id
  item = {}

  if params.id
    item = params.collection.findOne(params.id)
  else
    params.id = Random.id()


  fields = []

  content = ''
  for f in params.fields

    field = f.field
    type = f.type ? 'text'
    title = f.title ? ''
    options = f.options ? []



    if item
      if field.indexOf('.')+1
        f = field.split '.'
        if item? and item[f[0]]? and item[f[0]][f[1]]?
          val = item[f[0]][f[1]]
        else
          val = ''
      else
        val = item[field] ? ''
    else
      val = ''

    content += '<div class="form-group">'
    content += '<label>'+title+'</label>'
    if type == 'text'
      content += '<input class="form-control" type="text" name="'+field+'" value="'+val+'">'
    if type == 'file'
      content += '<input type="file" name="'+field+'" data-id="'+params.id+'">'
    if type == 'date'
      content += '<input class="form-control" type="date" name="'+field+'" value="'+val+'">'
    else if type == 'textarea'
      content += '<textarea class="form-control" name="'+field+'">'+val+'</textarea>'

    else if type == 'select'
      content += '<select class="form-control selectpicker" name="'+field+'">'
      for k, v of options
        content += '<option'
        if val == k then content += ' selected'
        content += ' value="'+k+'">'+v+'</option>'
      content += '</select>'
    content += '</div>'

  params.title ?= "Редактор"
  $('#crud').find('.modal-title').text(params.title)

  $('#crud').modal().find('.modal-body').html(content)


$(document).on 'change', '#crud input[type="file"]', (e) ->
  id = Params.id
  name = e.target.name
  file = e.target.files[0]
  file = new FS.File file
  file.id = id
  CrudFiles.insert file, (err, res) ->
    if err then return no
    Files[name] = res._id




Template.crud.events
  'submit form': (e) ->

    e.preventDefault()


    data = $(e.target).serializeArray()

    update = {}
    for one in data
      update[one.name] = one.value
    for one, val of Files
      update[one] = val
    Params.collection.upsert {_id: Params.id}, {$set: update}, (err, res) ->
      if err then $('#crud .error').html('Ошибка!')
      else $('#crud').delay(100).queue -> $(this).modal('hide').dequeue()
    #ФУНКЦИЯ ДОБАВЛЕНИЯ НОМЕРА order
    obj = Params.collection.find().fetch()
    max = 0
    for key in obj
      if max < key.order
        max = key.order
    newOrder = max + 1
    Params.collection.update(Params.id, {
      $set: { "order": newOrder },
    });
