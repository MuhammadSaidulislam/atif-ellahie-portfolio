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
                    <button>CV Download</button>
                </div>
                <div style={{ height: '800px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
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