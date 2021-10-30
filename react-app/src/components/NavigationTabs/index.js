import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationTabs.css'

function NavigationTabs() {

    return (
        <>
            <div className='navigation-tabs'>
                <div className='popular-tab'>
                    <Link id='popular' to='/videos/popular'>Popular</Link>
                </div>
                <div className='new-tab'>
                    <Link id='new' to='/videos/new'>New</Link>
                </div>
            </div>
        </>
    )
}

export default NavigationTabs;
