import React from 'react';
import './spinner.css';

const styles = {
  form: {
    position: 'relative'
  },
  spinner: {
    position: 'absolute',
    right: 9,
    top: 9
  }
};

export default ({ value, loading, onChange}) => (
  <form style={styles.form}>
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
    {loading && <span style={styles.spinner} className="spinner" />}
  </form>
);
