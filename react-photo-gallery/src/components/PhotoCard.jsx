import { useState } from "react";


function PhotoCard({ photo, isFavourite, onToggle }) {
  // track whether we should play the pop animation
  const [animating, setAnimating] = useState(false);

  function handleHeartClick() {
    setAnimating(true);
    onToggle(photo.id);
  }

  function handleAnimationEnd() {
    setAnimating(false);
  }

  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
      {/* Photo */}
      <div className="aspect-4/3 overflow-hidden bg-[#f0ede8]">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* author + heart */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-medium text-text truncate max-w-40">
            {photo.author}
          </p>
          <p className="text-xs text-muted mt-0.5">
            {photo.width} × {photo.height}
          </p>
        </div>

        <button
          onClick={handleHeartClick}
          onAnimationEnd={handleAnimationEnd}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className={`
            w-9 h-9 rounded-full flex items-center justify-center
            transition-colors duration-150 cursor-pointer
            ${isFavourite
              ? "bg-heart-bg "
              : "bg-bg text-[#a8a29e] hover:bg-heart-bg "
            }
            ${animating ? "heart-pop" : ""}
          `}
        >
          {/* heart icon  filled if favourite, outline if not */}
          {isFavourite ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;