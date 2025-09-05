const movieGrid = document.getElementById("movie-grid");

const fetchMovies = async () => {
    // Archive.org API URL for public domain movies
    const url = "https://archive.org/advancedsearch.php?q=mediatype:(movies)&fl[]=title,identifier,cover_url&rows=20&page=1&output=json";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        data.response.docs.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            // Embed the Archive.org player directly
            const movieEmbedUrl = `https://archive.org/embed/${movie.identifier}`;

            // Movie poster and details
            movieCard.innerHTML = `
                <img src="https://archive.org/services/img/${movie.identifier}" alt="${movie.title}">
                <div class="details">
                    <h3>${movie.title}</h3>
                    <div class="movie-player">
                        <iframe src="${movieEmbedUrl}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;

            movieGrid.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

// Run the fetch function when the page loads
window.onload = fetchMovies;
