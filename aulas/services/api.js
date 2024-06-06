import axios from 'axios';

export  const api = axios.create({
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2Y0MWZmNzQwZTg3NTJhZTA4YWFlZjc2NzBiNWY0OSIsInN1YiI6IjYzYmM4MDQxZmMzMWQzMDA3ZTMyNDMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6PlpimB1CWn0wJZRB5hroQNMMNkBmXDeJlEWczA2Xic'
      }
});

