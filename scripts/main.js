document.addEventListener('DOMContentLoaded', () => {
    const spotify = new SpotifyAPI();
    const searchBtn = document.getElementById('searchBtn');
    const usernameInput = document.getElementById('username');
    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('result');
    const yearRange = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');

    yearRange.addEventListener('input', (e) => {
        yearValue.textContent = e.target.value;
    });

    searchBtn.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('Silakan masukkan nama Anda');
            return;
        }

        // Show loading
        loadingElement.classList.remove('hidden');
        resultElement.classList.add('hidden');

        try {
            const filters = {
                year: yearRange.value,
                tempo: document.getElementById('tempo').value,
                mood: document.getElementById('mood').value
            };

            const song = await spotify.searchViralIndonesianSongs(filters);
            
            // Update UI with song result
            document.getElementById('songTitle').textContent = song.name;
            document.getElementById('artistName').textContent = song.artists[0].name;
            
            // Create Spotify player iframe
            const playerHtml = `
                <iframe
                    src="https://open.spotify.com/embed/track/${song.id}"
                    width="100%"
                    height="80"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media">
                </iframe>
            `;
            document.getElementById('player').innerHTML = playerHtml;

            // Show result
            loadingElement.classList.add('hidden');
            resultElement.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mencari lagu. Silakan coba lagi.');
            loadingElement.classList.add('hidden');
        }
    });
});