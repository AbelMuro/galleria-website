import React, {useState, useRef, useEffect} from 'react';
import icons from './icons';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function HeaderBar() {
    const [start, setStart] = useState(true);
    const slideshowGallery = useRef(1);
    const allGalleries = useSelector(state => state.allGalleries);
    const slideshow = useSelector(state => state.slideshow);
    const intervalRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleHome = () => {
        navigate('/');
    }

    const endSlideshow = () => {
        setStart(true);
        clearInterval(intervalRef.current);
    }    

    const startSlideshow = () => {
        setStart(false);
        intervalRef.current = setInterval(() => {
            const next = allGalleries.filter((gallery) => gallery.id === slideshowGallery.current + 1 && gallery)[0];
            slideshowGallery.current++;
            next ? navigate(`/${next.name.replaceAll(' ', '_')}`) : endSlideshow();
        }, 3000)
    }

    useEffect(() => {
        if(slideshow === allGalleries.length){
            dispatch({type: 'RESET_SLIDESHOW'});
            endSlideshow();
        }
            
    }, [slideshow])

    return(
        <header className={styles.header}> 
            <img src={icons['logo']} className={styles.header_logo} onClick={handleHome}/>
            <button className={styles.header_startSlideshow} onClick={start ? startSlideshow : endSlideshow}>
                {start ? 'start slideshow' : 'stop slideshow'}
            </button>
        </header>
    )
}

export default HeaderBar;