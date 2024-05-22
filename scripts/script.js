document.addEventListener('DOMContentLoaded', function() {
    var flags = document.querySelectorAll('.flag');

    flags.forEach(function(flag) {
        var todoList = flag.querySelector('.todo-list');
        
        flag.addEventListener('click', function(event) {
            if (event.target.closest('.todo-list')) {
                return;
            }

            if (todoList.style.display === 'none' || todoList.style.display === '') {
                todoList.style.display = 'block';
            } else {
                todoList.style.display = 'none';
            }
        });

        
    });

    var addButtons = document.querySelectorAll('.todo-list button');

    addButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var input = this.previousElementSibling;
            var newTask = input.value;
            if (newTask.trim() !== '') {
                var ul = this.previousElementSibling.previousElementSibling;
                var li = document.createElement('li');
                li.textContent = newTask;
                ul.appendChild(li);
                input.value = '';
            }
        });
    });

    var searchButton = document.getElementById('search-button');
    var searchBox = document.getElementById('search-box');
    
    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        var searchTerm = searchBox.value.trim().toLowerCase();
        flags.forEach(function(flag) {
            var countryName = flag.getAttribute('data-country').toLowerCase();
            if (countryName.includes(searchTerm)) {
                flag.style.display = 'block';
            } else {
                flag.style.display = 'none';
            }
        });
    });
});

var isLoggedIn = false;


function toggleUserStatus(status) {
    isLoggedIn = status;
    if (isLoggedIn) {
        $('#userTodo').slideDown(); 
    } else {
        $('#userTodo').slideUp();
    }
}

$('#userInfo').click(function() {
    if (isLoggedIn) {
        toggleUserStatus(false);
    } else {
        $('#register-form').slideUp();
        $('#login-form').slideUp();
        $('#searchClick').slideUp();
        toggleUserStatus(true); 
    }
});


var arr = [];
$('.todo-list').on('click', 'li', function() {
    if (isLoggedIn) {
        var newTask = $(this).text(); 
        var todoList = $('#userTodo ul');
        arr.push(newTask);
        todoList.empty();
        arr.forEach(function (newTask) {
            todoList.append('<li>' + newTask + '</li>');
        });
    } else {
        alert('Please login to add tasks.'); 
    }
});


var removeButton = $('#remove-button');
removeButton.on('click', function() {
    var index = ($('#todo-input').val());
    parseInt.index;
    var todoList = $('#userTodo ul');
    if (index >= 1) {
            arr.splice(index-1, 1);
    }
    todoList.empty();
    arr.forEach(function (newTask) {
        todoList.append('<li>' + newTask + '</li>');
    });
});






$(document).ready(function() {
    var users = [];


    $('#reset-button').click(function() {
        $('#search-box').val(''); 
        $('.flag').show(); 
    });

    $('#register').click(function() {
        $('#register-form').slideToggle();
        $('#login-form').slideUp(); 
         $('#searchClick').slideUp();
    });

    $('#Login').click(function() {
        $('#login-form').slideToggle();
        $('#register-form').slideUp(); 
        $('#searchClick').slideUp();
    });

    $('#search').click(function(){
        $('#searchClick').slideToggle();
        $('#login-form').slideUp();
        $('#register-form').slideUp();

    });

   

    $('#login-form').submit(function(e) {
        e.preventDefault();
        var username = $('#loginUser').val();
        var password = $('#loginPassword').val();

        var user = users.find(function(u) {
            return u.name === username && u.password === password;
        });

        if (user) {
            $('#userInfo').text('Welcome:  ' + user.name);
            $('#userInfo').removeClass('hidden');
            $('#register-form').addClass('hidden');
            $('#login-form').addClass('hidden');
        } else {
            alert('Invalid username or password.');
        }

        $('#login-form').slideUp();
    });

    $('#register-form').submit(function(e) {
        e.preventDefault();
        var name = $('#registerName').val();
        var password = $('#registerPassword').val();

        var newUser = {
            name: name,
            password: password
        };
        users.push(newUser);

        alert('Registration successful. You can now login.');
        console.log(users);
        $('#register-form').slideUp();
    });
});

