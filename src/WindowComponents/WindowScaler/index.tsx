import React, { FC } from 'react'

import './WindowScaler.scss';

const WindowScaler: FC = (props) => {
    return (
        <div className="WindowScaler">
            { props.children }
        </div>
    )
}

export default WindowScaler