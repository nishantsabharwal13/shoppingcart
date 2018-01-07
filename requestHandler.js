import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';


function handleRender(req,res) {
  axios.get('http://localhost:3001/books')
    .then(response => {
      // var myHtml = JSON.stringify(response.data);
      // res.render('index',{myHtml})

      //create redux store from server
      const store = createStore(reducers,{"books":{"books":response.data}});
      //get initial state froms store
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g,'<\\!--');
      //implement react-router on the server to intercept client request and define what to do with them 
      const Routes = {
        routes: routes,
        location: req.url
      }
      match(Routes, function(err, redirect, props) {
        if(err){
          res.status(500).send('error')
        } else if(redirect) {
          res.status(302, redirect.pathname, redirect.search)
        } else if(props) {
          const reactComponent = renderToString(
            <Provider store={store}>
              <RouterContext {...props}/>
            </Provider>
          )
          res.status(200).render('index', { reactComponent, initialState})
        } else {
          res.status(404).send('not found')
        }
      })

    })
    .catch(err => {
      console.log('#intilizing server side rending error');
    })
}

module.exports = handleRender;