import React from 'react';
import GUI from '../containers/gui.jsx';

const searchParams = new URLSearchParams(location.search);
const cloudHost = searchParams.get('cloud_host') || 'wss://infinity-server.onrender.com';

const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canSave={false}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;
