// Function to read URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// Function to display default images for a given country
function displayDefaultImages(country) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear previous content

    if (defaultImages[country]) {
        defaultImages[country].forEach(url => {
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = 'Default Image';

            gallery.appendChild(imgElement);
        });
    } else {
        gallery.innerHTML = '<p>No default images available for this country.</p>';
    }
}

// Function to fetch images from Unsplash
async function fetchAndDisplayImages(country) {
    const accessKey = 'tPiqAVhzcAhUsAvs0KREso0dv1gm_e4fvC5_AW6IH04'; // Replace with your actual Access Key
    const query = `${country} landscape`;

    const result = await searchUnsplash(query, accessKey);

    if (result) {
        displayPhotos(result.results);
    }
}

// Main function to handle image gallery generation
async function generateGallery() {
    const country = getQueryParam('country') || 'USA'; // Default to USA if no country is specified
    await fetchAndDisplayImages(country); // Fetch and display new images from Unsplash
    document.getElementById('country-name').textContent = country; // Update the country name in the header
}

// Initialize gallery on page load
window.onload = generateGallery;
document.querySelector('.generate-button').addEventListener('click', generateGallery);
 // Update the country name in the header
 

// Unsplash API function
async function searchUnsplash(query, accessKey) {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${randomPage}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Client-ID ${accessKey}`
        }
    });
    return await response.json();
}

// Function to display photos in the gallery
function displayPhotos(photos) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear previous content

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.urls.regular;
        imgElement.alt = photo.alt_description || 'Unsplash Photo';
        gallery.appendChild(imgElement);
    });
}
