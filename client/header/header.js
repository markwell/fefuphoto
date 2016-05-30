Template.header.helpers({
  menu: [
    {href:"aboutus", name:"О нас"},
    {href:"reports", name:"Фото"},
    {href:"team", name:"Команда"},
    {href:"contacts", name:"Контакты"}
  ]
});

Template.header.events({

  'click .go_to': function(e) {
    href = $(e.target).data('href')
    if($(href).length) {
      $('html, body').animate({ scrollTop: $(href).offset().top }, 500);
      $('#header .menu_btn').trigger('click');
    }
  }


});
