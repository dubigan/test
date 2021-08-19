import React from "react";
import * as styles from "../css/Loader.module.css";

const Loader = () => (
    // @ts-ignore
    <div className={styles.centerLoader}>
        {/* @ts-ignore */}
        <div className={styles.ldsDualRing} />
    </div>
);

export default Loader;
