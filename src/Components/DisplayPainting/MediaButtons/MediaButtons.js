import React from 'react';
import ProgressBar from './ProgressBar';
import styles from './styles.module.css';
import {useSelector} from 'react-redux';

function MediaButtons({id, title, author, setPainting}) {
    const allGalleries = useSelector(state => state.allGalleries);

    const handleForward = () => {
        const next = allGalleries.filter((painting) => painting.id === Number(id) + 1 && painting)[0];
        next && setPainting(next);
    }

    const handleBack = () => {
        const back = allGalleries.filter((painting) => painting.id === Number(id) - 1 && painting)[0];
        back && setPainting(back);
    }

    return(
        <footer className={styles.media}>
            <ProgressBar/>
            <div className={styles.media_content}>
                <h3>
                    {title}
                </h3>
                <h4>
                    {author}
                </h4>                
            </div>
            <div className={styles.media_buttons}>
                <button onClick={handleBack} disabled={id === 1}>
                    <div className={styles.back} ></div>
                </button>
                <button onClick={handleForward} disabled={id === allGalleries.length}>
                    <div className={styles.forward} ></div>
                </button>
            </div>
        </footer>
    )
}

export default MediaButtons;