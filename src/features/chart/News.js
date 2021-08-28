import React, { useEffect, useState , useRef} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Card, CardContent, Typography ,Container ,Paper ,Grid } from '@material-ui/core';
import { getNews } from 'Api/covid19';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion';
function News(props) {

  const news = useSelector((state => state.covid.News));
  const [data,setData] = useState([]);
  const [current,setCurrent] = useState(1);
  const handleChange = (e,value) => {
    setCurrent(value);

  }
  useEffect( () => {
    setData(news.slice(0,10))
  }, [news]);
  useEffect( () => {
    const prev= current-1;
    const p =  news.slice((prev)*10,current*10);
    setData(p);
    const anchor = document.querySelector('#back-to-top-anchor');
    anchor.scrollIntoView({ behavior:'smooth',block:'center'})
  },[current])
  return (
    <motion.div
    initial={{ x: -100, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3}}
    >
          <Container className='container'>
            <Typography variant="h4" className='title'>Tin tức mới cập nhật</Typography>
            <Paper elevation={4} className='wrapper'>
            {data.map((item, index) => {
              return (
              
                    <Card key={index} className="card" >
                      <a href={item.share_url} target="_blank" className="vnexpress">
                      <Grid container >
                              <Grid item xs={12} md={4} lg={4}className="img">
                                <img src={item.thumbnail_url} alt="up" />
                              </Grid>

                              <Grid item xs={12} md={8} lg={8}>
                              <CardContent>
                                <h2 >{item.title} </h2>
                                <Typography className="lead">{item.lead}</Typography>
                                <p>Theo VnExpress</p>
                              </CardContent>
                              </Grid>
                      </Grid>
                      </a>
                    </Card>
              
              );
            })}
            <Pagination count={5} onChange={handleChange} />
            </Paper>
        </Container>
    </motion.div>
  );
}

export default News;
