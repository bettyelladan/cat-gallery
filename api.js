// api.js

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

export async function updateCat(id, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/cats/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
            },
            body: JSON.stringify(data)
        });

        return response;
    } catch (error) {
        console.error('Error updating cat:', error);
        throw error;
    }
}

// Function to fetch cat images
export async function fetchCats(breedId = '', page = 1) {
    const response = await fetch(`${BASE_URL}/images/search?limit=10&page=${page}&order=DESC&breed_ids=${breedId}`, {
        headers: { 'x-api-key': API_KEY }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Function to fetch cat breeds
export async function fetchCatBreeds() {
    const response = await fetch(`${BASE_URL}/breeds`, {
        headers: { 'x-api-key': API_KEY }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}