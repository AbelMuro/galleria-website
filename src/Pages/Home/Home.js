import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Home() {
    const allGalleries = useSelector(state => state.allGalleries);
    const navigate = useNavigate();

    const handleSelect = (e) => {
        let name = e.target.getAttribute('data-name');  
        name = name.replaceAll(' ', '_');
        navigate(name);
    }

    return(
        <main className={styles.home}>
            {allGalleries.map((gallery) => {
                const title = gallery.name;
                const author = gallery.artist.name;
                const url = gallery.images.thumbnail;

                return(
                    <div className={styles.gallery} key={title}>
                            <img className={styles.gallery_image} src={url}/>
                            <div className={styles.gallery_content}>
                                <h1 className={styles.gallery_title}>
                                    {title}
                                </h1>
                                <p className={styles.gallery_author}>
                                    {author}
                                </p>
                            </div>
                            <div className={styles.overlay} onClick={handleSelect} data-name={title}></div>
                    </div>
                )
            })}
        </main>
    )
}

export default Home;