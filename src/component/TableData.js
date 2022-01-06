import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

function TableData(props) {
  const data = useSelector((state) => state.covid.Province);
  const shortList = data.slice(0, 5);
  const [showMore, setShowMore] = useState(false);
  const [province, setProvince] = useState([]);
  const handleShowmore = () => {
    setShowMore(!showMore);
    if (!showMore) setProvince(data);
    else setProvince(shortList);
  };
  useEffect(() => {
    setProvince(shortList);
  }, [data]);
  return (
    <div className="tableData">
      <Accordion elevation={4} defaultExpanded>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">
            Tình hình dịch COVID-19 tại các tỉnh thành phố
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Tỉnh/Thành phố</TableCell>
                  <TableCell align="right">Số ca mắc mới</TableCell>
                  <TableCell align="right">Tổng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {province.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.x}</TableCell>
                    <TableCell
                      className={classnames({
                        newcases: row.y > 0 ? true : false,
                      })}
                      align="right"
                    >
                      +{row.y.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.z.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowmore}
            >
              {showMore === false ? '  Xem thêm' : 'Thu gọn'}
            </Button>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TableData;
