import { React, useState, useEffect} from 'react'
import {Box, Button, Typography} from '@mui/material'
import MyDatePicker from './forms/MyDatePicker'
import MyTextField from './forms/MyTextField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'

const Edit = () => {

  const MyParam = useParams()
  const MyId = MyParam.id
 

  
  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`)
      .then((res) => {
        console.log(res.data); // Log fetched data
        setValue('name', res.data.name)
        setValue('start_date', dayjs(res.data.start_date))
        setValue('end_date', dayjs(res.data.end_date))
        setValue('comments', res.data.comments)
        setValue('status', res.data.status)
        
        
        
      })
      .catch((error) =>{
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    GetData(); // Fetch data on component mount
  }, []);




  const navigate = useNavigate()
  const defaultValues = {
    name:'',
    comments:'',
    status:'',
    
  }
  
  const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})

  const submission = (data) => 
    {
      const StartDate = dayjs(data.start_date).format("YYYY-MM-DD")
      const EndDate = dayjs(data.end_date).format("YYYY-MM-DD")

      AxiosInstance.put(`project/${MyId}/`,{
        name:data.name,
        status:data.status,
        comments:data.comments,
        start_date: StartDate,
        end_date: EndDate,
      })
      .then((res) =>{
        alert('Project created successfully!');
        navigate(`/`)
      })
      .catch((error) => {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
      });
    }

  return (
    <div>
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
                  label="Status"
                  name="status"
                  control ={control}
                  width="30%"
                />
                <Box sx={{width:'30%'}}>

                  <Button variant='contained' type='submit' sx={{width:'100%'}}>
                    Submit
                  </Button>
                </Box>

            </Box>
       
      </Box>
      </form>
    </div>
  )
}

export default Edit;
