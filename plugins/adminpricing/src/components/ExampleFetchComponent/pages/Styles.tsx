import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'transparent',
    marginTop: '-35px',
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  addButton: {
    marginRight: '10px',
    marginBottom: '14px',
  },
  tableWrapper: {
    '& th': {
      wordBreak: 'normal',
      borderBottom: '1px solid #d5d5d5',
      textTransform: 'capitalize',
      borderTop: 'none',
      position: 'static',
      padding: '8px 16px 8px 20px',
    },
    '& td': {
      padding: '2px 10px',
    },
  },
}));

export default useStyles;
