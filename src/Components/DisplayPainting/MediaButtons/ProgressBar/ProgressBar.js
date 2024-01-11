import React from 'react';
import styles from './styles.module.css';

function ProgressBar({percent}) {
    return(
        <progress className={styles.progressBar} max={100} value={30}>
        </progress>
    )
}

export default ProgressBar;