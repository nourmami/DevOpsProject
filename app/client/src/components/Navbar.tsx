import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="sticky top-0 z-10 bg-black backdrop-filter backdrop-blur-lg bg-opacity-30 w-full">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center h-16">
            <span className="flex flex-1 justify-start text-2xl text-white font-semibold">Pickloria</span>
            <nav className="flex flex-1 justify-center text-2xl space-x-4 text-white">
            <NavLink
            title="Explore"
            to="/"
            className={({isActive}) =>
                isActive ? " font-bold" : ""
              }
          >
            Explore
          </NavLink>

          <NavLink
            title="Upload"
            to="/upload"
            className={({isActive}) =>
                isActive ? " font-bold" : ""
              }
          >
            Upload
          </NavLink>

            </nav>
            <div className="flex flex-1 justify-end">
                <p></p>
            </div>
          </div>
        </div>
      </nav>
);
}

export default Navbar;