import { useState } from "react";
import Gallery from "./components/Gallery";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
         
          <div className="shrink-0">
            <h1 className="font-['DM_Serif_Display'] text-2xl text-text leading-none">
              Photo Gallery
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Curated from Picsum Photos
            </p>
          </div>

          {/* Search bar */}
          <div className="flex-1 sm:max-w-sm relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#a8a29e]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by author name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-bg border border-border rounded-lg text-text placeholder-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
            />
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-[#a8a29e] hover:text-text transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Gallery searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default App;