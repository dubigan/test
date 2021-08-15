import React from "react";
import * as styles from "../css/Loader.module.css";

const Loader = () => (
    <div className={styles.centerLoader}>
        <div className={styles.ldsDualRing} />
    </div>
);

export default Loader;
