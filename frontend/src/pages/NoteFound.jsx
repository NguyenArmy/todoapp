import React from 'react'

const NoteFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-center bg-slate-50">
            <img src="404_NotFound.png" alt="not found" className="max-w-full mb-6 w-96" />
            <p className="text-xl font-semibold">Page Not Found</p>
            <a href='/' className="inline-block mt-6 px-6 py-3 text-white bg-primary rounded-2xl hover:bg-primary-dark transition">Go to Home</a>
        </div>

    )
}

export default NoteFound
