Params = {}



@CRUD = (params) ->

  Params = params

  # если нет коллекции
  if !params.collection
    return false

  # если передан/не передан id
  item = {}

  if params.id
    item = Contacts.findOne(params.id)
  else
    params.id = Random.id()

  fields = []

  content = ''
  for f in params.fields

    field = f.field
    type = f.type ? 'text'
    title = f.title ? ''
    options = f.options ? []


    val = item[field] ? ''

    content += '<div class="form-group">'
    content += '<label>'+title+'</label>'
    if type == 'text'
      content += '<input class="form-control" type="text" name="'+field+'" value="'+val+'">'
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



Template.crud.events
  'submit form': (e) ->
    e.preventDefault()
    data = $(e.target).serializeArray()
    update = {}
    for one in data
      if Params.save?
        console.log 123
        one.value = Params.save one.value
      update[one.name] = one.value

    Params.collection.upsert {_id: Params.id}, {$set: update}, (err, res) ->
      if err then $('#crud .error').html('Ошибка!')
      else $('#crud').delay(100).queue -> $(this).modal('hide').dequeue()
