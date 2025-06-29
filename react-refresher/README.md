# Movie Discovery App

A modern React application for discovering and searching movies with trending analytics powered by The Movie Database (TMDB) API and Appwrite backend services.

## Features

- **Movie Search**: Real-time movie search with debounced input for optimal performance
- **Trending Analytics**: Track and display most searched movies using Appwrite database
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Movie Details**: Display movie ratings, release dates, and languages
- **Loading States**: Smooth loading indicators for better user experience

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom theme
- **Backend**: Appwrite (Database, Authentication)
- **API**: The Movie Database (TMDB) API
- **Utilities**: react-use (debouncing)

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key
- Appwrite project setup

## Environment Variables

Create a `.env` file in the root directory with the following variables from `.env.sample`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-refresher
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Search.jsx          # Search input component
│   ├── MovieCard.jsx       # Individual movie display card
│   └── LoadingSpinner.jsx  # Loading indicator
├── appwrite/
│   └── appwrite.js         # Appwrite configuration and API calls
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind configuration
```

## Key Components

### Search Component
- Debounced search input to prevent excessive API calls
- Real-time search term updates

### MovieCard Component
- Displays movie poster, title, rating, language, and release year
- Handles missing poster images gracefully

### Trending System
- Tracks search queries and popular movies
- Stores metrics in Appwrite database
- Displays trending movies with search count rankings

## API Integration

### TMDB API
- **Search Movies**: `/search/movie` endpoint for user queries
- **Discover Movies**: `/discover/movie` endpoint for popular movies
- **Image URLs**: Constructs poster URLs from TMDB image base URL

### Appwrite Database
- **Metrics Collection**: Stores search terms, counts, and movie metadata
- **Search Tracking**: Updates search counts for analytics
- **Trending Queries**: Retrieves most popular searches

## Styling

The application uses a custom Tailwind CSS theme with:
- Dark color scheme with purple accents
- Custom fonts (DM Sans, Bebas Neue)
- Responsive breakpoints
- Custom utility classes for gradients and animations

## Performance Optimizations

- **Debounced Search**: 800ms delay to reduce API calls
- **Efficient State Management**: Separate loading states for different sections
- **Error Handling**: Graceful error messages for failed requests
- **Image Optimization**: Fallback images for missing movie posters

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities