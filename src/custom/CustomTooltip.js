import React from 'react';
import { Paper } from '@material-ui/core';
function CustomTooltip({ payload, active, label, text }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <Paper elevation={5} style={{ padding: ' 1px 10px' }}>
          <p>{label ?? ''}</p>
          <p className="label">{`${text ?? ''} : ${
            payload && payload[0].value.toLocaleString()
          }`}</p>
        </Paper>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
