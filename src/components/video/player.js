import React, { createRef } from 'react';

class VideoAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: true,  // Initially the video is playing
        };
        this.videoRef = createRef();
    }

    // Handle playing or pausing the video
    handlePlayPause = () => {
        const video = this.videoRef.current;

        if (this.state.isPlaying) {
            video.pause(); // Pause the video if it's playing
            this.setState({ isPlaying: false });
        } else {
            video.play(); // Resume the video if it's paused
            this.setState({ isPlaying: true });
        }
    };

    // Handle stop functionality to hide the component
    handleStop = () => {
        this.setState({ isPlaying: false });
        this.videoRef.current.pause(); // Pause the video when stopping
        this.props.onStop(); // Call the passed stop function to hide the video ad
    };


    render() {
        const { videoUrl, posterUrl } = this.props;  // Video URL and Poster URL passed as props
        const { isPlaying } = this.state;

        return (
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    tight: "0",
                    bottom: '0',
                    backgroundColor: 'var(--bs-dark)',
                    display: this.state.isPlaying ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999, // Ensure it overlays on top
                }}
            >
                <div className="falseRec" style={{ position: 'relative', height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <video
                        ref={this.videoRef}
                        width="100%"  // Takes up the full width of the parent container
                        height="90%"  // Takes up the full height of the viewport
                        autoPlay={true}  // Autoplay the video
                        controls
                        muted
                        style={{ objectFit: 'contain', borderRadius: '10px' }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <button
                        onClick={this.handleStop}
                        style={{
                            position: 'absolute',
                            top: '40px',
                            right: '10px',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '40px',
                            opacity: '0.4',
                            transition: '0.7s',
                        }}
                        className="videoPlayButton"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default VideoAd;