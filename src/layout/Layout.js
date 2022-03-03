import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';

function Layout(props) {
    const { children } = props;
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default Layout
