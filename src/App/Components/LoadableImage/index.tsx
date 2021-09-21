import React, { FC } from 'react'

interface LoadableImageProps {
    title: string;
    index?: number;
    imageSRC: string;
    imageALT: string;
}

const LoadableImage:FC<LoadableImageProps> = (props) => {
    return (
        <div className="CenteredValues" >
            <label htmlFor={`LoadAbleImageDisplay-${props.index}-img`}>{props.title}:</label>
            <img id={`LoadAbleImageDisplay-${props.index}-img`} src={props.imageSRC} alt={props.imageALT} />
        </div>
    )
}

export default LoadableImage
