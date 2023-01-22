import React from 'react'
import '../styles/Header.css'

function Header(props) {
    return (
        <div className='mypic gap-4'>
            <h1>My Bucketlist</h1>
            <button 
                className='btn btn-outline-light rounded-pill px-4 py-2'
                onClick={props.onBtnFormClicked}>Make bucket item</button>
        </div>
    )
}

export default Header