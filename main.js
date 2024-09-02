// main.js

import { fetchCats, fetchCatBreeds, updateCat,  } from './api.js';
import { displayCats, setupSearchButton, setupLoadMoreButton } from './ui.js';

// Function to handle the PUT request
async function handleUpdateCat() {
    const imageId = document.getElementById('updateImageId').value;
    const catName = document.getElementById('updateCatName').value;

    if (!imageId || !catName) {
        alert('Please provide both image ID and new cat name.');
        return;
    }

    try {
        const response = await updateCat(imageId, { name: catName });
        if (response.status === 200) {
            alert('Cat image updated successfully!');
            fetchCats(); // Refresh the cat gallery after updating
        } else {
            alert('Failed to update cat image.');
        }
    } catch (error) {
        console.error('Error updating cat image:', error);
    }
}

// Function to setup event listener for the PUT request button
function setupUpdateCatButton() {
    document.getElementById('updateCatButton').addEventListener('click', handleUpdateCat);
}

// Call setup function
setupUpdateCatButton();





const initialLoad = async () => {
    try {
        const cats = await fetchCats();
        displayCats(cats);
    } catch (error) {
        console.error('Error loading initial cats:', error);
    }
};

// Initialize page with initial data
initialLoad();

// Setup event listeners for search and load more
setupSearchButton(async (breedId) => {
    try {
        const cats = await fetchCats(breedId);
        return cats;
    } catch (error) {
        console.error('Error fetching cats:', error);
    }
}, async () => {
    try {
        const breeds = await fetchCatBreeds();
        return breeds;
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
});

setupLoadMoreButton(async (page) => {
    try {
        const cats = await fetchCats('', page);
        return cats;
    } catch (error) {
        console.error('Error fetching more cats:', error);
    }
});