import React, { useEffect } from 'react';

const Lockdown = () => {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        // Disable specific keyboard shortcuts
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.altKey || event.key === 'F12' || event.key === 'Escape') {
                event.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup event listeners on component unmount
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
};

export default Lockdown;
