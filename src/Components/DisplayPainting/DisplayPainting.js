import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import paintingData from '~/Assets/Data';
import useMediaQuery from '~/Hooks/useMediaQuery.js';
import icons from './icons';
import styles from './styles.module.css';

function DisplayPainting() {
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const {paintingName} = useParams();
    const [painting, setPainting] = useState();

    const handleImages = (images) => {
        let large = images.large;
        let small = images.small;
        return mobile ? small : large;
    }

    useEffect(() => {
        const name = paintingName.replaceAll('-', ' ');
        const paintingInfo = paintingData.filter((painting) => painting.name === name && painting)[0];
        setPainting(paintingInfo);
    }, [paintingName])

    return painting && 
            <main className={styles.painting}>
                <section className={styles.painting_heading}>
                    <button className={styles.painting_view}>
                        <img src={icons['view']}/>
                        View image
                    </button>
                    <img className={styles.painting_image} src={handleImages(painting.images.hero)}/>
                    <div className={styles.painting_title}>
                        <h1>
                            {painting.name}
                        </h1>
                        <h2>
                            {painting.artist.name}
                        </h2>
                    </div>
                    <img className={styles.painting_author} src={painting.artist.image}/>
                </section>
                <section className={styles.painting_content}>
                    <strong className={styles.painting_year}>
                        {painting.year}
                    </strong>
                    <p className={styles.painting_desc}>
                        {painting.description}
                    </p>
                    <a className={styles.painting_source} href={painting.source} target='blank'>
                        Go to source
                    </a>                       
                </section>
             
            </main>

    
}

export default DisplayPainting;