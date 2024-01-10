import React from 'react';
import paintingData from '~/Assets/Data';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Home() {
    const navigate = useNavigate();

    const handleSelect = (e) => {
        let name = e.target.getAttribute('data-name');
        name = name.replaceAll(' ','-')
        navigate(name);
    }

    return(
        <main className={styles.home}>
            {paintingData.map((painting) => {
                const title = painting.name;
                const author = painting.artist.name;
                const url = painting.images.thumbnail;

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
                        <div className={styles.overlay} onClick={handleSelect} data-name={title}></div>
                    </div>
                )
            })}
        </main>
    )
}

export default Home;