import React from 'react';
import icons from './icons';
import styles from './styles.module.css';

function HeaderBar() {
    return(
        <header className={styles.header}> 
            <img src={icons['logo']} className={styles.header_logo}/>
            <button className={styles.header_startSlideshow}>
                start slideshow
            </button>
        </header>
    )
}

export default HeaderBar;