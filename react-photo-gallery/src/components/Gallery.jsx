import { useReducer, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

const FAVOURITES_KEY = "photo-gallery-favourites";

function loadFavourites() {
    try {
        const saved = localStorage.getItem(FAVOURITES_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

// save favourites array to localStorage whenever it changes
function saveFavourites(favourites) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

// TOGGLE - if photo id is already a favourite, remove it; if not then add it
function favouritesReducer(state, action) {
    let newState;

    switch (action.type) {
        case "TOGGLE":
            if (state.includes(action.id)) {
                newState = state.filter((id) => id !== action.id);
            } else {
                newState = [...state, action.id];
            }
            saveFavourites(newState);
            return newState;

        default:
            return state;
    }
}

//  Gallery Component
function Gallery({ searchQuery, onSearchChange }) {
    const { photos, loading, error } = useFetchPhotos();

    // favourites state managed with useReducer
    const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

    const handleToggleFavourite = useCallback((id) => {
        dispatch({ type: "TOGGLE", id });
    }, []); 

    const filteredPhotos = useMemo(() => {
        if (!searchQuery.trim()) return photos;
        const query = searchQuery.toLowerCase();
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(query)
        );
    }, [photos, searchQuery]);

    // loading state 
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="spinner" />
                <p className="text-sm text-muted">Loading photos…</p>
            </div>
        );
    }

    // Error state 
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-text">Could not load photos</p>
                <p className="text-xs text-muted">{error}</p>
            </div>
        );
    }

    //  No search results 
    if (filteredPhotos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-2">
                <p className="text-base font-medium text-text">No results for "{searchQuery}"</p>
                <p className="text-sm text-muted">Try a different author name.</p>
            </div>
        );
    }

    //  Photo grid 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo) => (
                <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favourites.includes(photo.id)}
                    onToggle={handleToggleFavourite}
                />
            ))}
        </div>
    );
}

export default Gallery;