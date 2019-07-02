import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
Vue.prototype.$axios = axios;

export default new Vuex.Store({
  state: {
    sessionName: 'Sundown',
    sessionEmail: 'EmailSession',
  },
  mutations: {
    startEmailSession(state, payload) {
      localStorage.setItem(state.sessionEmail,payload.email)
    },
    startSession(state, payload) {
      // check if our data already exist, in case of multiple users
      if (localStorage.getItem(state.sessionName)) {
        const data = JSON.parse(localStorage.getItem(state.sessionName));
        // check if there's no new session has already been start
        if (data.sessions.filter(i => i.id === 'new').length >= 0 && localStorage.getItem('EmailSession') === null) {
          // add a new session
          if (data.sessions.filter(i => i.id === 'new').length === 0) {
            data.sessions.push({ id: 'new', dish: payload.dish });
          } else {
            data.sessions.filter(i => i.id === 'new')[0].dish = payload.dish;
          }
        } else {
          // get the new session and add a dish
          data.sessions.filter(i => i.id === localStorage.getItem('EmailSession'))[0].dish = payload.dish;
        }
        // save the state
        localStorage.setItem(state.sessionName, JSON.stringify(data));
      } else {
        // start a new session
        localStorage.setItem(state.sessionName, JSON.stringify({
          sessions: [{ id: 'new', dish: payload.dish }],
        }));
      }
    },
    updateSession(state, payload) {
      const data = JSON.parse(localStorage.getItem(state.sessionName));
      const session = data.sessions.filter(i => i.id === 'new')[0];
      const sessionEmailFilter = data.sessions.filter(i => i.id === localStorage.getItem('EmailSession'))[0];
      if (data) {
        // update the session data
        if (payload.dish) session.dish = payload.dish;
        // check if the update is to add
        if (payload.add) {
          // check if there's a list of drinks and add to list
          if (localStorage.getItem('EmailSession')) {
            if (sessionEmailFilter.drinks) sessionEmailFilter.drinks.push(payload.add);
            else sessionEmailFilter.drinks = [payload.add];  
          } else {
            if (session.drinks) session.drinks.push(payload.add);
            // create a new list of drinks
            else session.drinks = [payload.add];
          }
        }
        if (payload.remove) {
          // check if there's a list of drinks and remove from list
          if (localStorage.getItem('EmailSession')) {
            if (sessionEmailFilter.drinks) sessionEmailFilter.drinks.splice(sessionEmailFilter.drinks.indexOf(payload.remove), 1);
            // else sessionEmailFilter.drinks = [payload.add];  
          } else {
            if (session.drinks) session.drinks.splice(session.drinks.indexOf(payload.remove), 1);
          }
        }
        if (payload.guests) {
          if (localStorage.getItem('EmailSession')) {
            sessionEmailFilter.guests = payload.guests;
          } else {
            session.guests = payload.guests;
          }
          // session.guests = payload.guests;
        }
        if (payload.time) {
          if (localStorage.getItem('EmailSession')) {
            sessionEmailFilter.time = payload.time;
          } else {
            session.time = payload.time;
          }
        }
      }
      // save back to data
      data.sessions[data.sessions.indexOf(data.sessions.filter(i => i.id === 'new')[0])] = session;
      data.sessions[data.sessions.indexOf(data.sessions.filter(i => i.id === localStorage.getItem('EmailSession'))[0])] = sessionEmailFilter;
      // save back to localStorage
      localStorage.setItem(state.sessionName, JSON.stringify(data));
    },
    // updateSession(state, payload) {
    //   const data = JSON.parse(localStorage.getItem(state.sessionName));
    //   const session = data.sessions.filter(i => i.id === 'new')[0];
    //   if (session) {
    //     // update the session data
    //     if (payload.dish) session.dish = payload.dish;
    //     // check if the update is to add
    //     if (payload.add) {
    //       // check if there's a list of drinks and add to list
    //       if (session.drinks) session.drinks.push(payload.add);
    //       // create a new list of drinks
    //       else session.drinks = [payload.add];
    //     }
    //     if (payload.remove) {
    //       // check if there's a list of drinks and remove from list
    //       if (session.drinks) {
    //         session.drinks.splice(session.drinks.indexOf(payload.remove), 1);
    //       }
    //     }
    //     if (payload.guests) {
    //       session.guests = payload.guests;
    //     }
    //     if (payload.time) {
    //       session.time = payload.time;
    //     }
    //   }
    //   // save back to data
    //   data.sessions[data.sessions.indexOf(data.sessions.filter(i => i.id === 'new')[0])] = session;
    //   // save back to localStorage
    //   localStorage.setItem(state.sessionName, JSON.stringify(data));
    // },

    saveSession(state, payload) {
      const data = JSON.parse(localStorage.getItem(state.sessionName));
      const session = data.sessions.filter(i => i.id === 'new')[0];
      const sessionEmailFilter = data.sessions.filter(i => i.id === localStorage.getItem('EmailSession'))[0];
      if (session) {
        session.id = payload.email;
        data.sessions[data.sessions.indexOf(data.sessions.filter(i => i.id === 'new')[0])] = session;
      } else {
        data.sessions[data.sessions.indexOf(data.sessions.filter(i => i.id === localStorage.getItem('EmailSession'))[0])] = sessionEmailFilter;
      }
      localStorage.setItem(state.sessionName, JSON.stringify(data));
    },
  },
  actions: {
    getDish: () => axios.get('https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP'),
    getDrinks: () => axios.get('https://api.punkapi.com/v2/beers'),
  },
});
