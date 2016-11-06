import api from '../api';

const profileLoaded = (payload) => {
  return {
    type: 'PROFILE_LOADED',
    payload
  };
};


function getProfile() {
  return (dispatch) => {
    api.get('/profile.json')
      .then((response) => {
        dispatch(profileLoaded(response.data.stats));
      });
  };
}

export {
  getProfile,
};
