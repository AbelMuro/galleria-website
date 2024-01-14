import React, {useState, useEffect, useRef} from 'react';
import icons from './icons';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function HeaderBar() {
    const [start, setStart] = useState(true);
    const allGalleries = useSelector(state => state.allGalleries);
    const slideshow = useSelector(state => state.slideshow);
    const intervalRef = useRef();
    const slide = useRef(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleHome = () => {
        dispatch({type: 'STOP_SLIDESHOW'});
        navigate('/');
    }

    const stopSlideshow = () => {     
        clearInterval(intervalRef.current);
        dispatch({type: 'STOP_SLIDESHOW'});
        setStart(true);
    }    

    const startSlideshow = () => {
        dispatch({type: 'START_SLIDESHOW'});
        setStart(false);   
        const next = allGalleries.filter((gallery) => gallery.id === slide.current + 1 && gallery)[0];
        slide.current++;
        if(next)
            navigate(`/${next.name.replaceAll(' ', '_')}`);
        else{
            stopSlideshow();
            slide.current = 0;
        }            
    }

    useEffect(() => {
        if(slideshow){
            intervalRef.current = setInterval(() => {
                startSlideshow();
            }, 3000)
        }
        else
            clearInterval(intervalRef.current); 
    }, [slideshow])


    useEffect(() => {
        slideshow ? setStart(false) : setStart(true);
    }, [slideshow])


    return(
        <header className={styles.header}> 
            <div className={styles.header_content}>
                <img src={icons['logo']} className={styles.header_logo} onClick={handleHome}/>
                <button className={styles.header_startSlideshow} onClick={start ? startSlideshow : stopSlideshow}>
                    {start ? 'start slideshow' : 'stop slideshow'}
                </button>                
            </div>

        </header>
    )
}

export default HeaderBar;