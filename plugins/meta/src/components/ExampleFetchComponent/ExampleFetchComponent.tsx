import React from 'react';

export const IframeComponent: React.FC = () => {
    return (
        <div>
            {/* First Row of Iframes */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                    <iframe 
                        src="https://programiz.pro" 
                        height="300" 
                        width="700" 
                        title="Programiz"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
                
            </div>

            {/* Second Row of Iframes */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ marginRight: '10px' }}>
                    <iframe 
                        src="https://programiz.pro" 
                        height="300" 
                        width="700" 
                        title="Programiz"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
                <div>
                    <iframe 
                        src="https://www.youtube.com/embed/uXWycyeTeCs" 
                        width="400" 
                        height="300" 
                        title="YouTube Video"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default IframeComponent;
