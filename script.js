$(document).ready(function() {
    // Fetch data when page loads
    fetchUsers();
    fetchStudents();
    fetchMovies();

    // User Form Submission
    $('#userForm').submit(function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const isEditing = $('#userForm').data('edit');
        const userId = $('#userForm').data('id');
        
        if (isEditing) {
            updateUser(userId, name, email);
        } else {
            createUser(name, email);
        }

        $('#name').val('');
        $('#email').val('');
        $('#userForm').removeData('edit').removeData('id'); // Reset form
    });

    // Student Form Submission
    $('#studentForm').submit(function(e) {
        e.preventDefault();
        const name = $('#studentName').val();
        const studentNumber = $('#studentNumber').val();
        const section = $('#section').val();
        const isEditing = $('#studentForm').data('edit');
        const studentId = $('#studentForm').data('id');
        
        if (isEditing) {
            updateStudent(studentId, name, studentNumber, section);
        } else {
            createStudent(name, studentNumber, section);
        }

        $('#studentName').val('');
        $('#studentNumber').val('');
        $('#section').val('');
        $('#studentForm').removeData('edit').removeData('id'); // Reset form
    });

    // Movie Form Submission
    $('#movieForm').submit(function(e) {
        e.preventDefault();
        const movieTitle = $('#movieTitle').val();
        const movieGenre = $('#movieGenre').val();
        const movieReleaseYear = $('#movieReleaseYear').val();
        const isEditing = $('#movieForm').data('edit');
        const movieId = $('#movieForm').data('id');
        
        if (isEditing) {
            updateMovie(movieId, movieTitle, movieGenre, movieReleaseYear);
        } else {
            createMovie(movieTitle, movieGenre, movieReleaseYear);
        }

        $('#movieTitle').val('');
        $('#movieGenre').val('');
        $('#movieReleaseYear').val('');
        $('#movieForm').removeData('edit').removeData('id'); // Reset form
    });
});

// Fetch Data Functions
function fetchUsers() {
    $.ajax({
        url: 'https://finalproject.site/api/v1/users',
        method: 'GET',
        success: function(data) {
            renderUsers(data);
        }
    });
}

function fetchStudents() {
    $.ajax({
        url: 'https://finalproject.site/api/v1/students',
        method: 'GET',
        success: function(data) {
            renderStudents(data);
        }
    });
}

function fetchMovies() {
    $.ajax({
        url: 'https://finalproject.site/api/v1/movies',
        method: 'GET',
        success: function(data) {
            renderMovies(data);
        }
    });
}

// Render Data Functions
function renderUsers(users) {
    $('#usersTable tbody').empty();
    users.forEach(user => {
        $('#usersTable tbody').append(`
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}

function renderStudents(students) {
    $('#studentsTable tbody').empty();
    students.forEach(student => {
        $('#studentsTable tbody').append(`
            <tr>
                <td>${student.name}</td>
                <td>${student.studentNumber}</td>
                <td>${student.section}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}

// Render Data Functions
function renderMovies(movies) {
    $('#moviesTable tbody').empty(); // Clear existing table rows

    // Loop through each movie in the movies array
    movies.forEach(movie => {
        // Ensure that the data is being passed correctly (check movie.id and movie.title)
        $('#moviesTable tbody').append(`
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>
                    <button onclick="editMovie(${movie.id})">Edit</button>
                    <button onclick="deleteMovie(${movie.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}


// CRUD Functions for Users, Students, and Movies
function createUser(name, email) {
    $.ajax({
        url: 'https://finalproject.site/api/v1/users',
        method: 'POST',
        data: { name: name, email: email },
        success: function() {
            fetchUsers(); // Refresh the table after creating the user
        },
        error: function() {
            alert('Error adding user!');
        }
    });
}

function updateUser(userId, name, email) {
    $.ajax({
        url: `https://finalproject.site/api/v1/users/${userId}`,
        method: 'PUT',
        data: { name: name, email: email },
        success: function() {
            fetchUsers(); // Refresh the table after updating the user
        },
        error: function() {
            alert('Error updating user!');
        }
    });
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        $.ajax({
            url: `https://finalproject.site/api/v1/users/${userId}`,
            method: 'DELETE',
            success: function() {
                fetchUsers(); // Refresh the table after deleting the user
            },
            error: function() {
                alert('Error deleting user!');
            }
        });
    }
}

function createStudent(name, studentNumber, section) {
    $.ajax({
        url: 'https://finalproject.site/api/v1/students',
        method: 'POST',
        data: { name: name, studentNumber: studentNumber, section: section },
        success: function() {
            fetchStudents(); // Refresh the table after creating the student
        },
        error: function() {
            alert('Error adding student!');
        }
    });
}

function updateStudent(studentId, name, studentNumber, section) {
    $.ajax({
        url: `https://finalproject.site/api/v1/students/${studentId}`,
        method: 'PUT',
        data: { name: name, studentNumber: studentNumber, section: section },
        success: function() {
            fetchStudents(); // Refresh the table after updating the student
        },
        error: function() {
            alert('Error updating student!');
        }
    });
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        $.ajax({
            url: `https://finalproject.site/api/v1/students/${studentId}`,
            method: 'DELETE',
            success: function() {
                fetchStudents(); // Refresh the table after deleting the student
            },
            error: function() {
                alert('Error deleting student!');
            }
        });
    }
}

function createMovie(title, genre, releaseYear) {
    $.ajax({
        url: 'https://finalproject.site/api/v1/movies',
        method: 'POST',
        data: { title: title, genre: genre, releaseYear: releaseYear },
        success: function() {
            fetchMovies(); // Refresh the table after creating the movie
        },
        error: function() {
            alert('Error adding movie!');
        }
    });
}

function updateMovie(movieId, title, genre, releaseYear) {
    $.ajax({
        url: `https://finalproject.site/api/v1/movies/${movieId}`,
        method: 'PUT',
        data: { title: title, genre: genre, releaseYear: releaseYear },
        success: function() {
            fetchMovies(); // Refresh the table after updating the movie
        },
        error: function() {
            alert('Error updating movie!');
        }
    });
}

function deleteMovie(movieId) {
    if (confirm('Are you sure you want to delete this movie?')) {
        $.ajax({
            url: `https://finalproject.site/api/v1/movies/${movieId}`,
            method: 'DELETE',
            success: function() {
                fetchMovies(); // Refresh the table after deleting the movie
            },
            error: function() {
                alert('Error deleting movie!');
            }
        });
    }
}

// Edit Functions for Users, Students, and Movies
function editUser(userId) {
    $.ajax({
        url: `https://finalproject.site/api/v1/users/${userId}`,
        method: 'GET',
        success: function(user) {
            $('#name').val(user.name);
            $('#email').val(user.email);
            $('#userForm').data('edit', true).data('id', userId); // Set form to edit mode
        }
    });
}

function editStudent(studentId) {
    $.ajax({
        url: `https://finalproject.site/api/v1/students/${studentId}`,
        method: 'GET',
        success: function(student) {
            $('#studentName').val(student.name);
            $('#studentNumber').val(student.studentNumber);
            $('#section').val(student.section);
            $('#studentForm').data('edit', true).data('id', studentId); // Set form to edit mode
        }
    });
}

function editMovie(movieId) {
    $.ajax({
        url: `https://finalproject.site/api/v1/movies/${movieId}`,
        method: 'GET',
        success: function(movie) {
            $('#movieTitle').val(movie.title);
            $('#movieGenre').val(movie.genre);
            $('#movieReleaseYear').val(movie.releaseYear);
            $('#movieForm').data('edit', true).data('id', movieId); // Set form to edit mode
        }
    });
}
