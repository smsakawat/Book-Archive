// Add Event handler 
document.getElementById('search-btn').addEventListener('click', function () {
    // change css styles
    document.getElementById('body-part').style.background = 'rgba(255,255,255,0.5)';
    document.getElementById('title').classList.add('text-dark');
    document.getElementById('horizontal-line').classList.add('text-dark');
    // clean UI
    document.getElementById('book-container').innerHTML = '';
    document.getElementById('amounts').innerHTML = '';
    document.getElementById('page-error').innerText = '';
    //  get search Text
    const searchText = document.getElementById('input-field').value;
    const error = document.getElementById('input-error');
    if (searchText === '') {
        error.innerText = 'Input field cannot be empty';
        return;
    } else {
        document.getElementById('input-error').innerHTML = '';
        loadData(searchText);
    }
})

// load data from server
const loadData = (searchText) => {
    document.getElementById('spinner').classList.remove('d-none');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBooks(data))
        .finally(
            document.getElementById('input-field').value = ''
        )
}

// display books
const showBooks = (data) => {
    // turn of spinner
    document.getElementById('spinner').classList.add('d-none');
    // error handle
    if (data.numFound === 0) {
        document.getElementById('page-error').innerText = 'NO RESULTS FOUND'
    }
    // show data
    else {
        const booksDocuments = data.docs;
        document.getElementById('amounts').innerText = `${booksDocuments.length} results found`;
        const booksDiv = document.getElementById('book-container');
        booksDocuments.forEach(element => {
            // imglink
            const imgSrc = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
            // empty image
            const emptyThumbnail = 'images/index.jpg';
            // create div and append  in container
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card h-100 border-0 shadow-lg p-2">
        <div class="rounded-3">
            <img  src="${element.cover_i ? imgSrc : emptyThumbnail}" class="card-img-top" alt="images/blank.png">
        </div>
        <div class="card-body my-0 pb-2">
            <h3 class="card-title mb-3 fw-bold">${element.title}</h3>

            <h4 class="mb-2 lead">Author: ${element.author_name ? element.author_name[0] : 'Unknown'}</h4>
            
            <p class="mb-1">Published By: ${element.publisher ? element.publisher[0] : 'Unknown'}</p>

            <p>First Published: ${element.publish_date ? element.publish_date[0] : 'Unknown'}</p>    
        </div>
        </div>`;
            booksDiv.appendChild(div);

        });

    }


}
