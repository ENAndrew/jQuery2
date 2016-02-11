$(document).ready(function(){
   
    var listo = [];
   
    var Task = function(task) {
       this.task = task;
       this.id = 'new';
    };
 
   var advanceTask = function(task) {
       var modified = task.innerText.trim();
       for (var i = 0; i < listo.length; i++) {
           if(listo[i].task === modified) {
               if(listo[i].id === 'new') {
                   listo[i].id = 'inProgress';
               } else if(listo[i].id === 'inProgress') {
                   listo[i].id = 'archived';
               } else {
                   listo.splice(i, 1);
               }
               break;
           };
        };
       task.remove();
   };
   
    $(document).on('click', '#item', function(e) {
       e.preventDefault();
       var task = this;
       advanceTask(task);
       this.id = 'inProgress';
       $('#currentList').append(this.outerHTML);
   });
   
   $(document).on('click', '#inProgress', function(e) {
       e.preventDefault();
       var task = this;
       task.id = 'archived';
       var changeIcon = task.outerHTML.replace('glyphicon glyphicon-arrow-right', 'glyphicon glyphicon-remove');
       advanceTask(task);
       $('#archivedList').append(changeIcon);
   });
   
   $(document).on('click', "#archived", function(e){
       e.preventDefault();
       var task = this;
       advanceTask(task);
   });
   
 
   var addTask = function(task) {
       if(task) {                     //cannot create blank task
           task = new Task(task);
           listo.push(task);
           
           $('#newItemInput').val('');
           $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
       }
       
       $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
   };

   $('#saveNewItem').on('click', function(e){
       e.preventDefault();
       var task = $('#newItemInput').val().trim();
       addTask(task);
   });
   
   //opens form
   $('#newListItem').on('click', function(){
       $('#newListItem').hide();
       $('#newTaskForm').fadeToggle('fast');

   });
   //closes form
   $('#cancel').on('click', function(e){
       e.preventDefault();
       $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
   });
   
   function storageAvailable(type) {
       try {
           var storage = window[type]; 
           var x = '__storage_test__';
           storage.setItem(x, x);
           storage.removeItem(x);
           return true;
       } catch(e) {
           return false;
       }
   }
   
    if(storageAvailable('localStorage')) {
       console.log("storage available");
   } else {
       console.log('no storage available');
   }
//   
//   function populateStorage() {
//       localStorage.setItem('itemList', JSON.stringify(listo));  
//   }
//   
//   function setList() {
//       var retrievedList = localStorage.getItem('itemList');
//       listo = JSON.parse(retrievedList);
//       console.log(listo);
//   }
//   
//   if(!localStorage.getItem('itemList')) {
//       populateStorage();
//   } else {
//       setList();
//   }
//   
//  
    
});


