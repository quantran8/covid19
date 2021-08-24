import React from 'react';
import { Grid } from '@material-ui/core';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
function Footer(props) {
  const top = () => {
    const t = document.getElementById('back-to-top-anchor');
    t.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <div className="footer">
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item sm={6} lg={6}>
          <p>Designed by QuanTran </p>
        </Grid>
        <Grid item sm={6} lg={6}>
          <p>Contact : quantran8@gmail.com</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
