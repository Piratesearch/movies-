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

            // Movie poster and details
            movieCard.innerHTML = `
                <img src="https://archive.org/services/img/${movie.identifier}" alt="${movie.title}">
                <div class="details">
                    <h3>${movie.title}</h3>
                    <p>Watch on <a href="https://archive.org/details/${movie.identifier}" target="_blank" style="color: #1db954;">Archive.org</a></p>
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
