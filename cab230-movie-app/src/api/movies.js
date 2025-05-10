import axios from 'axios';

const API_BASE = 'http://4.237.58.241:3000';

export const searchMovies = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE}/movies/search`, {
      params: { title: params.title || '', year: params.year || '', page: params.page || 1 }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${API_BASE}/movies/data/${imdbID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getPersonDetails = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE}/people/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};