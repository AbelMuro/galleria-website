import React, {useState, useEffect, useRef} from 'react';
import ViewImage from './ViewImage';
import MediaButtons from './MediaButtons';
import { useParams} from 'react-router-dom';
import useMediaQuery from '~/Hooks/useMediaQuery.js';
import styles from './styles.module.css';
import { useSelector} from 'react-redux';


function DisplayGallery() {
    const allGalleries = useSelector(state => state.allGalleries);
    const [gallery, setGallery] = useState();    
    const [mobile] = useMediaQuery('(max-width: 700px)');
    const [tablet] = useMediaQuery('(max-width: 950px) and (min-width: 700px)');
    const authorImageRef = useRef();
    const galleryTitleRef = useRef();
    const {galleryName} = useParams();

    const handleImages = (images) => {
        let large = images.large;
        let small = images.small;
        return mobile ? small : large;
    }

    //using the parameter of URL to decide which gallery to display
    useEffect(() => {
        const name = galleryName.replaceAll('_', ' ');
        const galleryInfo = allGalleries.filter((gallery) => gallery.name === name && gallery)[0];
        setGallery(galleryInfo);
    }, [galleryName]);


    useEffect(() => {
        return;
        if(tablet){
            setTimeout(() => {
                if(!galleryTitleRef.current || !authorImageRef.current) return;
                const height = getComputedStyle(galleryTitleRef.current).height.replace('px', '');
                authorImageRef.current.style.top = `${Number(height)}px`             
            }, 10)         //we wait until the transition is finished before we get the height of element
        }
        else {
            if(!authorImageRef.current) return;
            authorImageRef.current.style.top = '';
        }
    }, [tablet, gallery])

    return (<>
                {gallery && 
                    <main className={styles.gallery}>
                        <section className={styles.gallery_heading}>
                            <ViewImage image={gallery.images.gallery}/>
                            <img className={styles.gallery_image} src={handleImages(gallery.images.hero)}/>
                            <div className={styles.gallery_title} ref={galleryTitleRef}>
                                <h1>
                                    {gallery.name}
                                </h1>
                                <h2>
                                    {gallery.artist.name}
                                </h2>
                            </div>
                            <img className={styles.gallery_author} src={gallery.artist.image} ref={authorImageRef}/>
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
                            author={gallery.artist.name}/>}

            </>)

    
}

export default DisplayGallery;