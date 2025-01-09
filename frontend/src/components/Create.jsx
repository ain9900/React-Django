import {React, useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyDatePicker from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AxiosInstance from './Axios'
import dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'

const Create = () => {

  const [projectmanager, setProjectManager] = useState([]); // Initialize with an empty array
  const [loading , setLoading] = useState(true)

  const hardcoded_options = [
    {id:'', name:'None'},
    {id:'open', name:'Open'},
    {id:'In Progress', name:'In Progress'},
    {id:'Completed', name:'Completed'},
  ]

  const GetData = () => {
    AxiosInstance.get('projectmanager/')
      .then((res) => {
        setProjectManager(res.data); // Set data from API
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
  

  const navigate = useNavigate()
  const defaultValues = {
    name:'',
    comments:'',
    status:'',
    
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is a required Field.'),
    status: yup.string().required('Status is a required Field.'),
    comments: yup.string(),
    start_date: yup.date().required('Date is a required Field.'),
    end_date: yup.date().required('Date is a required Field.').min(yup.ref('start_date'),'The End date can not be Before start Date'),    
  })
  .required()
  
  const {handleSubmit,control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})

  const submission = (data) => 
    {
      const StartDate = dayjs(data.start_date).format("YYYY-MM-DD")
      const EndDate = dayjs(data.end_date).format("YYYY-MM-DD")

      AxiosInstance.post(`project/`,{
        name:data.name,
        status:data.status,
        comments:data.comments,
        start_date: StartDate,
        end_date: EndDate,
        projectmanager : data.projectmanager
      }).then(() =>{        
        navigate(`/`)
      })
      
    }

  return (
    <div>

{loading ? <p>Fetching Data</p>:
    <form onSubmit={handleSubmit(submission)}>

      <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}} >
        <Typography sx={{marginLeft:'20px', color:'#fff'}}>
          Create Record
        </Typography>
      </Box>

      <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}} >

            <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}>

                <MyTextField
                  label="Name"
                  name="name"
                  control ={control}
                  placeholder="Provide a Project Name"
                  width="30%"
                />
                <MyDatePicker
                  label="Start Date"
                  name="start_date"
                  control ={control}
                  width="30%"
                />
                <MyDatePicker
                  label="End Date"
                  name="end_date"
                  control ={control}
                  width="30%"
                />

            </Box>

            <Box sx={{display:'flex', justifyContent:'space-around' }}>

                <MyMultilineField
                  label="Comments"
                  name="comments"
                  control ={control}
                  placeholder="Provide a Project Comments"
                  width="30%"
                />
                <MySelectField
                  label="Project Manager"
                  name="project_manager"
                  control ={control}
                  width="30%"
                  options = {projectmanager}
                />

                  <MySelectField
                  label="Status"
                  name="status"
                  control ={control}
                  width="30%"
                  options = {hardcoded_options}

                  />                
            </Box>

            <Box sx={{display:'flex', paddingTop:'40px' , justifyContent:'start' }}>
                  <Button variant='contained' type='submit' sx={{width:'30%'}}>
                    Submit
                  </Button>
            </Box>
       
      </Box>
      </form>
}
    </div>
  )
}

export default Create
