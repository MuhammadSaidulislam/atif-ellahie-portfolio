import React from 'react'

const CV = () => {
    return (
        <div className='cvSection'>
            <div className='container'>
                <div className='cvHeading'>
                    <h1>Atif Ellahie</h1>
                    <button>CV Download</button>
                </div>
                <iFrame
                    src="/Atif-Ellahie-CV.pdf"
                    width="100%"
                    height="800px"
                />
            </div>
        </div>
    )
}

export default CV