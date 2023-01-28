import React from "react";
import { Link } from "react-router-dom";
import styles from './NotFound.module.css'

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Not Found Page</p>
      <Link to="/">
        <button>&larr; Back to Home</button>
      </Link>
    </div>
  );
};
