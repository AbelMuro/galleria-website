import React, {useState, useEffect} from 'react';
import Gallery from './Gallery';
import MediaButtons from './MediaButtons';
import { useParams } from 'react-router-dom';
import useMediaQuery from '~/Hooks/useMediaQuery.js';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';

function DisplayPainting() {
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const {paintingName} = useParams();
    const allGalleries = useSelector(state => state.allGalleries);
    const [gallery, setGallery] = useState();

    const handleImages = (images) => {
        let large = images.large;
        let small = images.small;
        return mobile ? small : large;
    }

    useEffect(() => {
        const name = paintingName.replaceAll('-', ' ');
        const galleryInfo = allGalleries.filter((gallery) => gallery.name === name && gallery)[0];
        setGallery(galleryInfo);
    }, [paintingName])

    return (<>
                {gallery && 
                    <main className={styles.gallery}>
                        <section className={styles.gallery_heading}>
                            <Gallery image={gallery.images.gallery}/>
                            <img className={styles.gallery_image} src={handleImages(gallery.images.hero)}/>
                            <div className={styles.gallery_title}>
                                <h1>
                                    {gallery.name}
                                </h1>
                                <h2>
                                    {gallery.artist.name}
                                </h2>
                            </div>
                            <img className={styles.gallery_author} src={gallery.artist.image}/>
                        </section>
                        <section className={styles.gallery_content}>
                            <strong className={styles.gallery_year}>
                                {gallery.year}
                            </strong>
                            <p className={styles.gallery_desc}>
                                {gallery.description}
                            </p>
                            <a className={styles.gallery_source} href={gallery.source} target='blank'>
                                Go to source
                            </a>                       
                        </section>
                    </main>}
                    {gallery && 
                        <MediaButtons 
                            id={gallery.id} 
                            title={gallery.name} 
                            author={gallery.artist.name}
                            setPainting={setGallery}/>}

            </>)

    
}

export default DisplayPainting;