$(document).ready(function(){
    
    //Array for task objects
    var listo = [];
   
   
   //Defines the Task object that will be stored in listo array
    var Task = function(task) {
       this.task = task;
       this.id = 'new';
    };
    
   var addTask = function(task) {
       if(task) {                     //cannot create blank task
           task = new Task(task);
           listo.push(task);
           
           $('#newItemInput').val('');
           $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
       }
       
       $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
   };
   
   //Adds new task object via addTask function when save button clicked
   $('#saveNewItem').on('click', function(e){
       e.preventDefault();
       var task = $('#newItemInput').val().trim();
       addTask(task);
   });
 
    //allows for changes in task object Id state when clicked
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
   
   
   // tests for available localStorage 
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


    ///storage test object and retrival// this is functional
    var testObject = {
        name: 'thing',
        id: 'blah'
    };
    
    localStorage.setItem('testObject', JSON.stringify(testObject));
    var retrievedObject = localStorage.getItem('testObject');
    
    console.log(JSON.parse(retrievedObject));
    
});


