import '../sass/main.scss';

import Season from './models/Season';
import {getSeason,el,renderLoader,clearLoader} from './views/base';


import {renderAnimes,clearResult} from './views/seasonView';
import '../sass/main.scss';



/** Global state of the app
 * - Anime list
 * - Anime Detail
 * - 
 */

 const state = {};

 
 const seasonController  = async (year,ses) =>{

    // 1. New season object add to state
    state.seasonList = new Season(year,ses);
    // 2. Prepare UI for results   
    
    renderLoader(el.mainContent);

    // 3. Get Animes
    await state.seasonList.getAnimes();
    
    // 4. Render Result On UI
    clearLoader();
    renderAnimes(state.seasonList.animes);
};


el.navLinnks.addEventListener('click', e => {

    const t = e.target.closest('a');
    const year =new Date();
    let val =  t.getAttribute('href');
    val = val.split('#');
    val = val[1];
    // 1. highlight link
    const els = document.querySelectorAll('.header__nav--wrap a');
    els.forEach(el=> el.classList.remove('active'));
    t.classList.add('active');
    // 2. Clear Main Content 
    clearResult();
 
    // 3. render new Season
    seasonController(year.getFullYear(),val);

 
});





// Evvent Listener
window.addEventListener('load', () => {

    // 1. Get currentYear - currentSeason
    // const season = getSeason();
    seasonController('2019','summer');
    

});


// window.addEventListener('mousemove',e =>{
//     // if(e.target === 'anime'){

//     // }
//     const t = e.target.closest('.anime-card__ep--add');
//     if(t){
//         const p = t.parentElement.parentElement;
//         if(p){
//            p.insertAdjacentHTML('beforeend','<h1>TESTTESTESRSERSE</h1>');
    
//         }
//     }
   
// });