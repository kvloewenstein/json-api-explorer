const fetchButton = document.getElementById('fetchButton');
const postList = document.getElementById('postList');
const errorDiv = document.getElementById('error');

const postForm = document.getElementById('postForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

async function fetchPosts() {
    postList.innerHTML = '';
    errorDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts.');
        }

        const posts = await response.json();
        errorDiv.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr>
            `;
            postList.appendChild(postElement);
        });

    } catch (error) {
        errorDiv.innerHTML = `Error: ${error.message}`;
    }
}
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    formError.innerHTML = '';
    formSuccess.innerHTML = '';

    const title = document.getElementById('titleInput').value.trim();
    const body = document.getElementById('bodyInput').value.trim();

    if (!title || !body) {
        formError.innerHTML = 'Both fields are required.';
        return;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body })
        });

        if (!response.ok) {
            throw new Error('Failed to submit post.');
        }

        const result = await response.json();
        formSuccess.textContent = `Post submitted! ID: ${result.id}`;

      
        const newPost = document.createElement('div');
        newPost.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.body}</p>`;
        postList.appendChild(newPost);

        postForm.reset();

    } catch (error) {
        formError.textContent = `Error: ${error.message}`;
    }
});


fetchButton.addEventListener('click', fetchPosts);
