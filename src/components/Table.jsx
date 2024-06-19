import React from "react";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F0F0F0",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9F9F9",
  },
}));
const StyledTableCell = styled(TableCell)(({ theme, sx }) => ({
  color: "#274593",
  textAlign: "ceter",
  ...sx,
}));

const Table = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650, borderRadius: 100 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#D5E3F7", padding: "20px 5px !important" }}>
          <TableRow sx={{ padding: "20px 5px !important" }}>
            {columns.map(({ label, onClick = () => {}, style = {} }) => (
              <StyledTableCell onClick={onClick} sx={{ ...style }}>
                {label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ date, tName, reportName, reportZone, allChild, allHirearchy, customerType, customerName, reportPeriod }, index) => (
            <StyledTableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {date}
              </TableCell>
              <TableCell align="right">{tName}</TableCell>
              <TableCell align="right">{reportName}</TableCell>
              <TableCell align="right">{reportZone}</TableCell>
              <TableCell align="right">{allChild}</TableCell>
              <TableCell align="right">{allHirearchy}</TableCell>
              <TableCell align="right">{customerType}</TableCell>
              <TableCell align="right">{customerName}</TableCell>
              <TableCell align="right">{reportPeriod}</TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={allImgPaths.trash}
                  alt="trash"
                  style={{
                    display: "flex",
                    width: "30px",
                    height: "30px",
                    padding: "4px 5px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "34px",
                    background: "#F7D5D5",
                    gap: "10px",
                    flexShrink: "0",
                  }}
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table;
