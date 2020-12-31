import React from 'react';

const MicroApp: React.FC =  ({ children }) => {
    return <div>
        <main id="subapp-container">
            {children}
        </main>
    </div>;
}

export default MicroApp;