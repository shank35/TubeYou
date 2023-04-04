export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const RECEIVE_USER = 'users/RECEIVE_USER';
export const REMOVE_USER = 'users/REMOVE_USER';

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId
});

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch('/api/users');
  const data = await res.json();
  dispatch(receiveUsers(data.user));
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(receiveUser(data.user));
};

export const createUser = (user) => async (dispatch) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  dispatch(receiveUser(data));
};

export const updateUser = (user) => async (dispatch) => {
  const res = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  dispatch(receiveUser(data));
};

export const deleteUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });
  dispatch(removeUser(userId));
};

export const getUsers = (state) => {
  if (state.users) {
    return Object.values(state.users);
  } else {
    return [];
  }
};

export const getUser = (userId) => (state) => {
  if (state.users) {
    return state.users[userId];
  } else {
    return null;
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case RECEIVE_USER:
      return { ...state, [action.user.id]: action.user };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
