import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';

function ProgressBar({percent, total}) {
    const [currentPercent, setCurrentPercent] = useState();

    useEffect(() => {
        setCurrentPercent((percent/total) * 100);
    }, [percent, total])

    return(
        <progress className={styles.progressBar} max={100} value={currentPercent}>
        </progress>
    )
}

export default ProgressBar;