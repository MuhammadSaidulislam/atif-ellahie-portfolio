import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const CV = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div className='cvSection'>
            <div className='container'>
                <div className='cvHeading'>
                    <h1>Atif Ellahie</h1>
                    <button onClick={() => {
            const link = document.createElement("a");
            link.href = "/Atif-Ellahie-CV.pdf"; // your file path
            link.download = "Atif-Ellahie-CV.pdf";    // file name
            link.click();
          }}>CV Download</button>
                </div>
                <div style={{ height: '800px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl="/Atif-Ellahie-CV.pdf"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            </div>
        </div>
    )
}

export default CV