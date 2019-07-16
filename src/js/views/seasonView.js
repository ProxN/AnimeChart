

import {el} from './base';


const groupby = (list,key) =>{
   return list.reduce( (acc,curr,i) => {
        (acc[curr[key]]  = acc[curr[key]] || []).push(curr);
        return acc;
    },{});
};



const reduceArray = (list,el) => {
    return list.reduce((acc,curr,index) => {
         if(index <= el){
             acc.push(curr);
         }
         return acc;
     },[]);
 
 };





const removeHen = arr => {
    let newArr = [];
    arr.forEach( curr => {
        curr.genres.forEach( el => {
            if(el.name !== 'Hentai'){
                newArr.push(curr);
            }
        });
    });
    return newArr;
};

const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
const setHours = (date,h,m) =>{
    date.setHours(h,m);
    return date;
};

const splidDate = (date) => {

    let split = date.split('T');
    const sDate = split[0];
    split = split[1].split(':');
    const hours = split[0];
    const min = split[1];
    
    const obj = {
        sDate,
        hours,
        min
    };
    
    return obj;
   
}

const timerCount = (date,display) => {
    
     // Split Date
    const  dateObj  = splidDate(date);
    // Set Airing Time
    const airTime =  new Date(dateObj.sDate).getTime();
    // Get today's date and time
    const nowTime = new Date().getTime();
    // Get How Many Days after Anime Start 
    const dist = nowTime - airTime;
    let aDays = 1 + Math.floor( dist / (1000 * 60 * 60 * 24));
   
    // Get epiosde number 
    let ep = Math.ceil(aDays / 7);
 
    aDays = ep * 7;

    // Add Days To Airing Date
    let newAiringDate = addDays(dateObj.sDate,aDays);
    //console.log(newAiringDate);
    newAiringDate = setHours(newAiringDate,dateObj.hours,dateObj.min);
    // // Find the distance between now and the count down date
    let distance = newAiringDate.getTime() - nowTime;
    // // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const nextEp = `EP${ep + 1}: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    var dx = document.getElementById(display);
    if(dx){
        dx.textContent = nextEp;
    }
};

const renderAnime = (anime,type) => `
    <div class="anime-card">
        <div class="anime-card__title">
            <a href="#">${anime.title}</a>
        </div>
        <div class="anime-card__ep">
            <span class="anime-card__ep--num">${anime.episodes != null ? anime.episodes : '?'}</span>
            <span class="anime-card__ep--add"><i class="icon ion-md-add"></i>
            </span>
        </div>
        <div class="anime-card__img">
            <img src="${anime.image_url}"
                alt="">
        </div>
        <div class="dropdown">
            <ul>
                <li class="dropdown__watching"><i class="icon ion-md-checkmark"></i>
                    Watching</li>
                <li class="dropdown__maybe">
                        <i class="icon ion-md-help"></i>
                        Maybe Watching</li>
                <li class="dropdown__notWatching">
                        <i class="icon ion-md-close"></i>
                    Not Watching</li>

                    <li class="dropdown__clear">
                        Clear
                    </li>
            </ul>
        </div>
        <div class="anime-card__air" id="${anime.mal_id}">

        ${
            setInterval(() => {
                type === 'TV' ? timerCount(anime.airing_start,anime.mal_id) : '???';
            }, 1000)
        }
      
        </div>
        <div class="anime-card__content">
            <div class="anime-card__content--body">
                <div class="anime-card__content--date">
                    ${anime.airing_start}
                </div>
                <div class="anime-card__content--meta">
                    <span>${anime.source}</span>
                    <a href="${anime.producers.length > 0 ? anime.producers[0].url : '#'}">
                    ${anime.producers.length > 0 ? anime.producers[0].name : '???'}
                    </a>
                </div>

                <div class="anime-card__content--synposis">
                    <p>${anime.synopsis}</p>
                </div>
            </div>
            <div class="anime-card__content--cate">
                <ul>
                    ${reduceArray(anime.genres,1).map(curr => `<li> ${curr.name} </li>`)}             
                </ul>   
            </div>
        </div>
</div>
`;

const renderSection = (animeList,title) => {

    const markup = `
    <section class="list-anime">
     <h2 class="heading-2">${title}</h2>
     ${animeList.map(curr => renderAnime(curr,title)).join('')}
     </section>
    `;

    document.querySelector('.main-content').insertAdjacentHTML('beforeend',markup);


};




export const renderAnimes = listAnimes => {

    // 1. Split animes By Types 
    let animesType = groupby(listAnimes,'type');
    animesType.OVA = removeHen(animesType.OVA);
    animesType.SHORT = [...reduceArray(animesType.OVA,4),...reduceArray(animesType.ONA,3)];
    animesType.TV =  reduceArray(animesType.TV,25);
    // 3. Render Animes 
    renderSection(animesType.TV,'TV');
    renderSection(animesType.Movie,'Movie');
    renderSection(animesType.SHORT,'OVA / ONA  / SPECIAL');
};



export const clearResult = () =>{

    el.mainContent.innerHTML = "";

};

