import React from 'react';

interface Props {
    index: number
    active: number
    children?: React.ReactElement
}

const TabPanel: React.FC<Props> = (props: Props) => {
    return (
        props.index === props.active ? <React.Fragment/> : props.children || <React.Fragment/>
    )
}

export default TabPanel;