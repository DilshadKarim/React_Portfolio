import React,{useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import { exerciseOptions,fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

    const SearchExercises = (setExercises, bodyPart, setBodyPart) => {
    const [search, setsearch] = useState('') 
    const [bodyParts,setBodyParts] = useState([])
    useEffect(() => {
      const fetchExercisesData = async() =>{
        const bodyPartData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOptions);
        setBodyParts(['all, ...bodyPartsData']);
      }
      fetchExercisesData();
    }, [])
    
    const handleSearch = async() => {
        if(search){
             const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
             
             const searched = exercisesData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
             );
             setsearch('');
             setExercises(SearchExercises);
        }
    }
     
  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='2px'>
        <Typography fontWeight={700} sx={{
            fontSize:{lg:'44px', xs:'30px'}
        }}>
            Awsome Exercise You <br/>
            Should Know
        </Typography>
        <Box position='relative' mb='72px'>
            <TextField sx={{ 
                input:{fontWeight:'700',
                 border:'none', 
                 borderRadius:'4px'
                },
                width:{lg: '800px', xs:'350px'},
                backgrountColor:'#fff',
                borderRadius:'40px'
                }}
             height='76px' value={search} 
             onChange={(e)=>setsearch(e.target.value.toLowerCase())}
              placeholder='Search Exercises' type='text'/>
             <Button className='search-btn'
                sx={{
                    bgcolor:'#ff2625',
                    color:'#fff',
                    textTransform:'none',
                    width:{lg:'175px',xs:'80px'},
                    fontSize:{lg:'20px',xs:'14px'},
                    height:'56px',
                    position:'absolute',
                    right:'0'
                }}
                onClick={handleSearch}
             >
                    search
             </Button>
        </Box>
        <Box sx={{position:'relative', width:'100%', p:'20px'}}>
                <HorizontalScrollbar data={bodyParts}
                bodyPart = {bodyPart} setBodyPart ={setBodyPart}
                />
                
        </Box>
    </Stack>
  )
}
export default SearchExercises