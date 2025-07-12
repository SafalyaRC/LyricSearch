import { useState } from 'react'
import axios from 'axios'

function App() {
  const [artist, setArtist] = useState("")
  const [songName, setSongName] = useState("")
  const [lyrics, setLyrics] = useState("")

  function handleClick() {
    if (artist.trim() === "" || songName.trim() === "") {
      setLyrics("Please enter both an artist and a song name to search.");
      return;
    }

    setLyrics("Loading lyrics..."); // Provide immediate feedback

    axios.get(`https://api.lyrics.ovh/v1/${artist}/${songName}`)
      .then(
        (res) => {
          if (res.data.lyrics) {
            setLyrics(res.data.lyrics);
          } else {
            setLyrics("Lyrics not found. Double-check the artist and song name, or try another song.");
          }
        }
      )
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        setLyrics("An error occurred while fetching lyrics. Please try again later.");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900 text-gray-50 flex flex-col items-center justify-center p-4 sm:p-8 font-['Inter',_sans-serif] antialiased relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>
      
      {/* Main container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-5xl w-full flex flex-col items-center transform transition-all duration-500 ease-in-out hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:border-white/10 hover:bg-black/50">
        
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"></div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 tracking-tight leading-tight">
            LyricSearch
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl font-medium tracking-wide">
            Discover the words behind your favorite songs
          </p>
        </div>

        {/* Input and Button Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-12">
          <div className="relative group">
            <input
              type="text"
              placeholder="Artist Name (e.g., Drake)"
              className="w-full p-5 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 ease-in-out text-lg font-medium tracking-wide group-hover:bg-black/40 group-hover:border-white/10"
              onChange={(e) => { setArtist(e.target.value) }}
              value={artist}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Song Name (e.g., NOKIA)"
              className="w-full p-5 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 ease-in-out text-lg font-medium tracking-wide group-hover:bg-black/40 group-hover:border-white/10"
              onChange={(e) => { setSongName(e.target.value) }}
              value={songName}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
          </div>

          <button
            type="submit"
            className="relative px-8 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 active:from-purple-800 active:via-blue-800 active:to-cyan-800 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent text-lg tracking-wide flex items-center justify-center group overflow-hidden"
            onClick={() => handleClick()}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 mr-3 relative z-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
            <span className="relative z-10">Find Lyrics</span>
          </button>
        </div>

        {/* Lyrics Display Area */}
        <div className="relative p-8 bg-black/30 backdrop-blur-sm border border-white/5 rounded-3xl w-full min-h-[350px] max-h-[550px] overflow-y-auto custom-scrollbar shadow-inner text-gray-200 leading-relaxed text-lg tracking-wide flex items-center justify-center group">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/3 via-transparent to-cyan-500/3 pointer-events-none"></div>
          
          {lyrics ? (
            <pre className="whitespace-pre-wrap font-mono text-gray-200 w-full relative z-10 leading-7">
              {lyrics}
            </pre>
          ) : (
            <div className="text-center relative z-10">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <p className="text-gray-500 text-xl font-medium mb-2">
                Ready to find lyrics?
              </p>
              <p className="text-gray-600 text-base">
                Enter an artist and song name above to get started
              </p>
            </div>
          )}
        </div>

        {/* Footer accent */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Powered by Saf
          </p>
        </div>
      </div>

      
    </div>
  )
}

export default App