import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMusclesExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchbeUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      const execriseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);

      

      setExerciseDetail(execriseDetailData);

      // const exerciseVideosData = await fetchData(`${youtuSearchbeUrl}/search?query=${execriseDetailData.name}`,youtubeOptions);
      // setExerciseVideos(exerciseVideosData);

      const exerciseVideosData = await fetchData(`${youtubeSearchbeUrl}/search?query=${execriseDetailData.name} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${execriseDetailData.target}`, exerciseOptions);
      setTargetMusclesExercises(targetMuscleExercisesData);
     

      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${execriseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);


    };

    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos = {exerciseVideos} name = {exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises ={targetMuscleExercises} equipmentExercises ={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
