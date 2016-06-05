Template.header.helpers({
  menu: [
    {href:"aboutus", name:"О нас"},
    {href:"reports", name:"Фото"},
    {href:"team", name:"Команда"},
    {href:"contacts", name:"Контакты"}
  ]
});


Template.header.events({

});

Template.header.onRendered(function(e) {
  setTimeout(function(){
         $('.dropdown-toggle').text('Вход');
     }, 300);
});
