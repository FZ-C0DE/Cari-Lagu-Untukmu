class SpotifyAPI {
    constructor() {
        this.CLIENT_ID = '5081432e079b4f48b8f381aa52b9ac98';
        this.CLIENT_SECRET = 'af808870de7e4eebb890f15f382bd065';
        this.accessToken = null;
    }

    async getAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        this.accessToken = data.access_token;
    }

    async searchViralIndonesianSongs(filters) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }

        const params = new URLSearchParams({
            q: 'genre:indonesia year:' + filters.year,
            type: 'track',
            market: 'ID',
            limit: 50
        });

        const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        const data = await response.json();
        return this.filterSongsByMoodAndTempo(data.tracks.items, filters);
    }

    filterSongsByMoodAndTempo(songs, filters) {
        // Implement basic filtering based on audio features
        const tempoMap = {
            'slow': { min: 0, max: 90 },
            'medium': { min: 91, max: 120 },
            'fast': { min: 121, max: 200 }
        };

        const moodMap = {
            'happy': { valence: 0.7, energy: 0.7 },
            'sad': { valence: 0.3, energy: 0.3 },
            'energetic': { valence: 0.6, energy: 0.8 },
            'calm': { valence: 0.5, energy: 0.3 }
        };

        // For demo purposes, return the first song
        // In a real implementation, you would need to fetch audio features
        // and implement proper filtering
        return songs[0];
    }
}