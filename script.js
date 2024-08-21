document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = Array.from(document.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (text, completed = false) => {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');
        li.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span>${text}</span>
        `;
        list.appendChild(li);

        li.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTasks();
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTaskToDOM(text);
            input.value = '';
            saveTasks();
        }
    });

    loadTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');


    const loadUserData = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            usernameInput.value = userData.username;
            passwordInput.value = userData.password;
        }
    };

    const saveUserData = (username, password) => {
        const userData = {
            username,
            password
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const storedData = JSON.parse(localStorage.getItem('userData'));
        
        if (storedData) {
            if (storedData.username === username && storedData.password === password) {
                messageDiv.textContent = 'Login successful!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Invalid username or password.';
                messageDiv.style.color = 'red';
            }
        } else {
            saveUserData(username, password);
            messageDiv.textContent = 'User registered successfully!';
            messageDiv.style.color = 'blue';
        }
    });

    loadUserData();
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookmark-form');
    const titleInput = document.getElementById('title');
    const urlInput = document.getElementById('url');
    const bookmarkList = document.getElementById('bookmark-list');

    const loadBookmarks = () => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach((bookmark, index) => addBookmarkToDOM(bookmark, index));
    };

    const saveBookmarks = () => {
        const bookmarks = Array.from(document.querySelectorAll('li')).map(li => {
            return {
                title: li.querySelector('.title').textContent,
                url: li.querySelector('a').href
            };
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };

    const addBookmarkToDOM = (bookmark, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="title">${bookmark.title}</span>
            <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Delete</button>
        `;
        bookmarkList.appendChild(li);

        li.querySelector('.edit').addEventListener('click', () => {
            titleInput.value = bookmark.title;
            urlInput.value = bookmark.url;
            form.dataset.editIndex = index;
        });

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveBookmarks();
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const url = urlInput.value.trim();
        const editIndex = form.dataset.editIndex;

        if (editIndex !== undefined) {
            const listItems = document.querySelectorAll('li');
            listItems[editIndex].querySelector('.title').textContent = title;
            listItems[editIndex].querySelector('a').href = url;
            listItems[editIndex].querySelector('a').textContent = url;
            delete form.dataset.editIndex;
        } else {
            addBookmarkToDOM({ title, url }, document.querySelectorAll('li').length);
        }

        titleInput.value = '';
        urlInput.value = '';
        saveBookmarks();
    });

    loadBookmarks();
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const contactList = document.getElementById('contact-list');

    const loadContacts = () => {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.forEach((contact, index) => addContactToDOM(contact, index));
    };

    const saveContacts = () => {
        const contacts = Array.from(document.querySelectorAll('li')).map(li => {
            return {
                firstName: li.querySelector('.first-name').textContent,
                lastName: li.querySelector('.last-name').textContent,
                phone: li.querySelector('.phone').textContent,
                email: li.querySelector('.email').textContent
            };
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    const addContactToDOM = (contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="first-name">${contact.firstName}</span>
            <span class="last-name">${contact.lastName}</span>
            <span class="phone">${contact.phone}</span>
            <span class="email">${contact.email}</span>
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Delete</button>
        `;
        contactList.appendChild(li);

        li.querySelector('.edit').addEventListener('click', () => {
            firstNameInput.value = contact.firstName;
            lastNameInput.value = contact.lastName;
            phoneInput.value = contact.phone;
            emailInput.value = contact.email;
            form.dataset.editIndex = index;
        });

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveContacts();
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const editIndex = form.dataset.editIndex;

        if (editIndex !== undefined) {
            const listItems = document.querySelectorAll('li');
            const item = listItems[editIndex];
            item.querySelector('.first-name').textContent = firstName;
            item.querySelector('.last-name').textContent = lastName;
            item.querySelector('.phone').textContent = phone;
            item.querySelector('.email').textContent = email;
            delete form.dataset.editIndex;
        } else {
            addContactToDOM({ firstName, lastName, phone, email }, document.querySelectorAll('li').length);
        }

        firstNameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        saveContacts();
    });

    loadContacts();
});
