import { useState } from "react";
import { MenuIcon, XIcon } from '@heroicons/react/solid'; // Icons from Heroicons

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="drawer">
            {/* Subtle Icon Button - Hides when Sidebar is Open */}
            {!isOpen && (
                <button
                    className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(true)}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            )}

            {/* Drawer Logic */}
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle hidden"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
            />

            <div className="drawer-content">
                {/* Main Page Content */}
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    className="drawer-overlay"
                    onClick={() => setIsOpen(false)}
                ></label>

                <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <XIcon className="w-6 h-6" />
                    </button>

                    {/* Sidebar Items */}
                    <ul className="mt-12 space-y-2">
                        <li><a href="#">Sidebar Item 1</a></li>
                        <li><a href="#">Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
