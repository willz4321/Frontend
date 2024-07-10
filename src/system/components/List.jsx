import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { visuallyHidden } from '@mui/utils';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { Await } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { AddProduct } from './AddProduct';
import { AddCategory } from './AddCategory';
import Swal from 'sweetalert2';
import { AddUser } from './AddUser';

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, item, rowCount, onRequestSort, headCells } = props;
    const {user} = useContext(AppContext)
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={item != null && item < rowCount}
            checked={item != null && item === rowCount}
           
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.any,
  item: PropTypes.any,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const {user} = useContext(AppContext)
  const { item, tipo, setSelected } = props;

  const handleClose = () => [
    setOpenDialog(false)
  ]
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleConfirm = async () => {
    if (tipo === 'productos') {
      await starDeleteProduct(item);
    } else if (tipo === 'categorias') {
      await starDeleteCategory(item);
    } else if (tipo === 'usuarios') {
      await starDeleteUser(item);
    }
    setOpenDelete(false);
  };

  return (
    <>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          item > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >
        {item != null ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {item.id} - {item.nombre}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Productos
          </Typography>
        )}

        {item != null && user.rol == 0? (
          <>
              <Tooltip  title={<span style={{ fontSize: '1.5em' }}>Eliminar</span>}>
              <IconButton onClick={() => setOpenDelete(true)}>
                  <DeleteIcon />
              </IconButton>
              </Tooltip>
              <Tooltip  title={<span style={{ fontSize: '1.5em' }}>Modificar</span>}>
              <IconButton onClick={() => setOpenDialog(true)} > 
              <SettingsIcon />
              </IconButton>
          </Tooltip>
          </>
        ) : (
          <Tooltip   title={<span style={{ fontSize: '1.5em' }}>Agregar nuevo producto</span>}>
            <IconButton onClick={() => setOpenDialog(true)} >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <article>
     {
       tipo == 'productos' ? (
        <Dialog open={openDialog} onClose={handleClose} maxWidth='xs'>
          <DialogTitle>Agregar un Producto</DialogTitle>
          <DialogContent>
                  <AddProduct productoEdit={item} />
          </DialogContent>
        </Dialog>
       ): tipo == 'categorias' ? (
        <Dialog open={openDialog} onClose={handleClose} maxWidth='xs'>
          <DialogTitle>Agregar una Categoría</DialogTitle>
          <DialogContent>
                  <AddCategory categoryEdit={item} />
          </DialogContent>
        </Dialog>
       ) : tipo == 'usuarios' ? (
        <Dialog open={openDialog} onClose={handleClose} maxWidth='xs'>
          <DialogTitle>Agregar un usuario</DialogTitle>
          <DialogContent>
                  <AddUser userEdit={item} />
          </DialogContent>
        </Dialog>
       ): null
     }
     {
          <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Esta seguro que desea eliminar?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
     }
      </article>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  item: PropTypes.any,
  tipo: PropTypes.any.isRequired,
  setSelected: PropTypes.func,
};

export const List = ({headCells, rows, tipo}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    setSelected(selected === row ? null : row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => {
    if (selected && selected.id === id) {
      return true;
    }
    return false;
  };
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    
    () =>
    
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box position='static' sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar item={selected} tipo={tipo} setSelected={setSelected} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              item={selected}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

               if (tipo == 'categorias') {

               }
               switch (tipo) {
                case 'productos':
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.nombre}</TableCell>
                      <TableCell align="right">{row.precio}</TableCell>
                      <TableCell align="right">{row.descripcion}</TableCell>
                      <TableCell align="right">{row.category.nombre}</TableCell>
                    </TableRow>
                  );
            
                case 'categorias':
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.nombre}</TableCell>               
                    </TableRow>
                  );
     
                case 'usuarios':
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          alt="Remy Sharp"
                          src={`data:image/jpeg;base64,${row.avatar}`}
                          sx={{ width: 70, height: 70 }}
                        />
                      </Stack>
                        </TableCell>               
                      <TableCell align="left">{row.nombre}</TableCell>               
                      <TableCell align="left">{row.correo}</TableCell>               
                      <TableCell align="left">{row.edad}</TableCell>               
                    </TableRow>
                  );
                
                default:
                  break;
               } 
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
           labelRowsPerPage="Filas por página:"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
