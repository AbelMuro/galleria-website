import React from 'react';
import imageData from '~/Assets/Data';
import styles from './styles.module.css';

function Home() {
    return(
        <main className={styles.home}>
            {imageData.map((image) => {
                const title = image.name;
                const author = image.artist.name;
                const url = image.images.thumbnail;

                return(
                    <div className={styles.painting}>
                        <img className={styles.painting_image} src={url}/>
                        <div className={styles.painting_content}>
                            <h1 className={styles.painting_title}>
                                {title}
                            </h1>
                            <p className={styles.painting_author}>
                                {author}
                            </p>
                        </div>
                        <div className={styles.overlay}></div>
                    </div>
                )
            })}
        </main>
    )
}

export default Home;