import { React, useState, useEffect} from 'react'
import {Box, Button, Typography} from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'

const Delete = () => {

  const MyParam = useParams()
  const MyId = MyParam.id

  const [myData, setMyData] = useState([]);
  const [loading , setLoading] = useState(true)
  
  
  const GetData = () => {

    AxiosInstance.get(`project/${MyId}`)

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
  }, []);


  const navigate = useNavigate()

  const submission = (data) => 
    {
      
      AxiosInstance.delete(`project/${MyId}/`)
      .then((res) =>{        
        navigate(`/`)
      })
      .catch((error) => {
        console.error('Error creating project:', error);
        
      });
    }

  return (
    <div>
    {loading ? <p>Fetching Data</p>:
    <div>     

        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}} >
          <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete Project : {myData.name}
          </Typography>
        </Box>

        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}} >

              
              <Box sx={{display:'flex', justifyContent:'start' }}>
              Are you Sure Want to Delete? : {myData.name}
              </Box>                  
                  <Box sx={{width:'30%', justifyContent:'end'}}>
                    <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
                      Delete Project
                    </Button>
                  </Box>
        </Box>
    </div>
                  
}
 
        
    </div>
  )
}

export default Delete;
