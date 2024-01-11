import React, {useEffect, useRef, useState} from 'react';
import icons from './icons';
import styles from './styles.module.css';

function Gallery({image}) {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef();
    const imageRef = useRef();


    const handleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(open){
            overlayRef.current.style.display = 'flex';
            setTimeout(() => {
                if(!overlayRef.current || !imageRef.current) return;
                overlayRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.8539)';
                imageRef.current.style.transform = 'scale(1)';
            }, 10)
        }
        else {
            overlayRef.current.style.backgroundColor = '';
            imageRef.current.style.transform = '';
            setTimeout(() => {
                overlayRef.current.style.display = '';
            }, 200)
        }
    }, [open])

    return(       
        <>
            <button className={styles.view} onClick={handleOpen}>
                <img src={icons['view']}/>
                View image
            </button>     
            <div className={styles.overlay} ref={overlayRef}>
                <section className={styles.gallery}>
                    <div className={styles.gallery_container}>
                        <button className={styles.gallery_close} onClick={handleOpen}>
                            close
                        </button>                        
                        <img className={styles.gallery_image} src={image} ref={imageRef}/>                        
                    </div>
                </section>
            </div>   
        </>             

    )
}

export default Gallery;