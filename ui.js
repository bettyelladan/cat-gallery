// ui.js

export function displayCats(cats) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear previous content
    cats.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = 'Cat image';
        gallery.appendChild(img);
    });
}

export function displayBreeds(breeds) {
    const searchInput = document.getElementById('searchInput');
    const breedOptions = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    searchInput.innerHTML = breedOptions;
}

export function setupSearchButton(searchFunction, fetchBreedsFunction) {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async () => {
        const breedId = document.getElementById('searchInput').value;
        try {
            const cats = await searchFunction(breedId);
            displayCats(cats);
        } catch (error) {
            console.error('Error searching cats:', error);
        }
    });

    // Populate breeds on load
    fetchBreedsFunction().then(breeds => {
        displayBreeds(breeds);
    }).catch(error => {
        console.error('Error fetching breeds:', error);
    });
}

export function setupLoadMoreButton(loadMoreFunction) {
    const loadMoreButton = document.getElementById('loadMoreButton');
    let currentPage = 1;
    loadMoreButton.addEventListener('click', async () => {
        currentPage++;
        try {
            const cats = await loadMoreFunction(currentPage);
            displayCats(cats);
        } catch (error) {
            console.error('Error loading more cats:', error);
        }
    });
}
