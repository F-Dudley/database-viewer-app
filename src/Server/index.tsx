import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import './Server.scss';

    interface ServerApplicationProps {

    }

    interface RequestFormat {

    }

export default class ServerApplication extends Component {

    public constructor(props: ServerApplicationProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <h1>This is The Server Window.</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <ServerApplication />
    </React.StrictMode>,
    document.getElementById('root')
);
