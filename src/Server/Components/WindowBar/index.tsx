import React, { FC } from 'react'
import { ipcRenderer } from 'electron/renderer';

import './WindowBar.scss';

const WindowBar: FC = () => {

    const MinimiseClicked = () => {
        ipcRenderer.send("ServerWindow-Minimise");
    }

    const QuitClicked = () => {
        ipcRenderer.send("ServerWindow-Quit")
    }

    return (
        <div className="WindowBar">
            <ul className="WindowBar_Buttons">
                <li className="right">
                    <a onClick={MinimiseClicked}>X</a>
                </li>                
                <li className="right">
                    <a onClick={QuitClicked}>=</a>
                </li>
            </ul>
        </div>
    )
}

export default WindowBar
