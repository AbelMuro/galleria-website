import React, {useState, useEffect} from 'react';
import icons from './icons';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function HeaderBar() {
    const [start, setStart] = useState(true);
    const slideshow = useSelector(state => state.slideshow);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }

    const stopSlideshow = () => {
        dispatch({type: 'STOP_SLIDESHOW'})
        setStart(true);
    }    

    const startSlideshow = () => {
        dispatch({type: 'START_SLIDESHOW'})
        setStart(false);        
    }

    useEffect(() => {
        slideshow ? setStart(false) : setStart(true);
    }, [slideshow])


    return(
        <header className={styles.header}> 
            <img src={icons['logo']} className={styles.header_logo} onClick={handleHome}/>
            <button className={styles.header_startSlideshow} onClick={start ? startSlideshow : stopSlideshow}>
                {start ? 'start slideshow' : 'stop slideshow'}
            </button>
        </header>
    )
}

export default HeaderBar;