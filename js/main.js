// get search value and call api
document.getElementById('search-btn').addEventListener('click', function () {
    // clean Ui
    document.getElementById('book-container').innerHTML = '';
    document.getElementById('amounts').innerHTML = '';
    document.getElementById('page-error').innerText = '';
    //  get search value
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
    console.log(data)
    // turn of spinner
    document.getElementById('spinner').classList.add('d-none');
    // error handle
    if (data.numFound === 0) {
        document.getElementById('page-error').innerText = 'PAGE NOT FOUND'
    }
    // display data
    else {
        const booksArray = data.docs;

        document.getElementById('amounts').innerText = `${booksArray.length} items found`
        const booksDiv = document.getElementById('book-container');
        booksArray.forEach(element => {

            console.log(element);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card h-100 border-0 shadow-lg p-2">
        <div class="rounded-3">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="image not found">
        </div>
        <div class="card-body my-0 pb-2">
            <h2 class="card-title mb-1 fw-bold">${element.title}</h2>

            <h4 class="mb-1">Author: ${element.author_name ? element.author_name : 'unknown'}</h4>
            
            <p class="mb-1">Published By: ${element.publisher[0] ? element.publisher[0] : 'unknown'}</p>

            <p>First Published: ${element.publish_date[0] ? element.publish_date[0] : element.publish_year}</p>    
        </div>
        </div>`;
            booksDiv.appendChild(div);

        });
    }

}
