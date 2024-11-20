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
               src="https://example.com/app/main#/dashboards/5ec13529b61a73002db725d3?embed=true"  width="400" 
               height="300"  scrolling="auto">

               </iframe>

                </div>
               
                <div style={{ flex: 1 }}>
                <h3>You tube </h3>
                    <iframe 
                        src="https://www.youtube.com/embed/uXWycyeTeCs" 
                        width="400" 
                        height="300" 
                        title="YouTube Video"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-start' }}>
             <iframe 
                     src="https://example.com/dashboard" 
                         width="400" 
                          height="300"
                         title="External Dashboard" 
                         style={{  border: 'none' }}
                     />
             </div>

             
        </div>
    );
}

export default IframeComponent;
