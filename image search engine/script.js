document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchTerm = input.value.trim();

        if (searchTerm === '') {
            alert('Please enter a search term.');
            return;
        }
         const apiKey =   // enter api key
        const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => { 
                displayImages(data.hits);   
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    });

    function displayImages(images) {
        resultsContainer.innerHTML = '';

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.webformatURL;
            img.alt = image.tags;
            resultsContainer.appendChild(img);
        });
    }
});
