import React, { FC } from 'react'

import './WindowBar.scss';

interface WindowBarProps {
    windowName: string
}

const WindowBar: FC<WindowBarProps> = (props) => {

    const MinimiseClicked = () => {
        window.api.windowFuncs.send(`${props.windowName}-Minimise`);
    }

    const QuitClicked = () => {
        window.api.windowFuncs.send(`${props.windowName}-Quit`)
    }

    return (
        <div className="WindowBar">
            <ul className="WindowBar_Buttons">
                <li className="right">
                    <a onClick={QuitClicked}>X</a>
                </li>                
                <li className="right">
                    <a onClick={MinimiseClicked}>=</a>
                </li>
            </ul>
        </div>
    )
}

export default WindowBar