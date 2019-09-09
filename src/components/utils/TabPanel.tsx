import React from 'react';

interface Props {
    index: number
    active: number
}

const TabPanel: React.FC<React.PropsWithChildren<Props>> = (props) => {
    return (
        <React.Fragment>{props.index === props.active ? props.children : null} </React.Fragment>
    )
}

export default TabPanel;