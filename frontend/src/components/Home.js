import React, { useEffect, useMemo, useState } from 'react';
import AxiosInstance from './Axios';
import { MaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material'
import {Link} from 'react-router-dom'

const Home = () => {
  const [myData, setMyData] = useState([]); // Initialize with an empty array
  const [loading , setLoading] = useState(true)
  const GetData = () => {
    AxiosInstance.get('project/')
      .then((res) => {
        setMyData(res.data); // Set data from API
        console.log(res.data); // Log fetched data
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    GetData(); // Fetch data on component mount
  }, []); // Add dependency array to prevent infinite re-renders

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Access nested data with dot notation
        header: 'Project Name',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'comments', // Normal accessorKey
        header: 'Comments',
        size: 200,
      },
      {
        accessorFn: (row) => dayjs(row.start_date).format('DD-MM-YYYY'),
        header: 'Start Date',
        size: 150,
      },
      {
        accessorFn: (row) => dayjs(row.end_date).format('DD-MM-YYYY'),
        header: 'End Date',
        size: 150,
      },
    ],
    [], // Empty dependency array for memoization
  );

  return (
    <div>
    {loading ? <p>Fetching Data</p>:
      <MaterialReactTable
          columns={columns}
            data={myData}
            enableRowActions
            renderRowActions={({row}) =>(

              <Box sx = {{display:'flex', flexWrap:'nowrap', gap:'8px'}}>

              <IconButton color="primary" component={Link} to={`edit/${row.original.id}`}>
                <EditIcon/>
              </IconButton>

              <IconButton color='primary' component={Link} to={`delete/${row.original.id}`} >
                <DeleteIcon/>
              </IconButton>
              </Box>
            )}
        />
    }
    </div>
  );
};

export default Home;
