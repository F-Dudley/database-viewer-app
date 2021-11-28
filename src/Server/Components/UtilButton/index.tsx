import React, { FC } from 'react'

import './UtilButton.scss';

interface UtilButton {
    buttonTitle: string;
    onClickFunc: () => void;
}

const UtilButton: FC<UtilButton> = (props) => {
    return (
        <div className="UtilButton">
            <a onClick={props.onClickFunc}>
                {
                    props.buttonTitle
                }
            </a>
        </div>
    )
}

export default UtilButton
