async function searchUnsplash(query, clientId, perPage = 30) {
    const randomPage = Math.floor(Math.random() * 10) + 1; // Random page number between 1 and 10
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&page=${randomPage}`;
    const headers = {
        'Authorization': `Client-ID ${clientId}`
    };

    try {
        const response = await fetch(url, { headers });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            console.error(`Error: ${response.status} - ${errorData.errors || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }

    return null;
}

function displayPhotos(photos) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear previous content

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.urls.regular;
        imgElement.alt = photo.description || 'Unsplash Photo';

        gallery.appendChild(imgElement);
    });
}

document.querySelector('.generate-button').addEventListener('click', async () => {
    const accessKey = 'tPiqAVhzcAhUsAvs0KREso0dv1gm_e4fvC5_AW6IH04'; // Replace with your actual Access Key
    const query = 'USA landscape';

    const result = await searchUnsplash(query, accessKey);

    if (result) {
        displayPhotos(result.results);
    }
});
