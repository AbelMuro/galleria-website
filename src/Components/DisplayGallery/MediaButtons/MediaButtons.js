import React, {useEffect, useRef} from 'react';
import ProgressBar from './ProgressBar';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';

function MediaButtons({id, title, author}) {
    const allGalleries = useSelector(state => state.allGalleries);
    const slideshow = useSelector(state => state.slideshow);
    const intervalRef = useRef();
    const slideshowGallery = useRef(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleForward = () => {
        clearInterval(intervalRef.current);
        slideshowGallery.current = 0;
        dispatch({type: 'STOP_SLIDESHOW'});
        window.scrollTo({top: 0, behavior: 'smooth'});
        const next = allGalleries.filter((painting) => painting.id === Number(id) + 1 && painting)[0];
        next && navigate(`/${next.name.replaceAll(' ', '_')}`);
    }

    const handleBack = () => {
        clearInterval(intervalRef.current);
        slideshowGallery.current = 0;
        dispatch({type: 'STOP_SLIDESHOW'});
        window.scrollTo({top: 0, behavior: 'smooth'});
        const back = allGalleries.filter((painting) => painting.id === Number(id) - 1 && painting)[0];
        back && navigate(`/${back.name.replaceAll(' ', '_')}`);
    }

    const stopSlideshow = () => {     
        clearInterval(intervalRef.current);
        dispatch({type: 'STOP_SLIDESHOW'});
    }    

    const nextSlideshow = () => {
        const next = allGalleries.filter((gallery) => gallery.id === slideshowGallery.current + 1 && gallery)[0];
        slideshowGallery.current++;
        if(next)
            navigate(`/${next.name.replaceAll(' ', '_')}`);
        else{
            stopSlideshow();
            slideshowGallery.current = 0;
        }            
    }

    useEffect(() => {
        if(slideshow){
            nextSlideshow();
            intervalRef.current = setInterval(() => {
                nextSlideshow();
            }, 3000)
        }
        else
            clearInterval(intervalRef.current);
    }, [slideshow])


    return(
        <footer className={styles.media}>
            <ProgressBar percent={id} total={allGalleries.length}/>
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