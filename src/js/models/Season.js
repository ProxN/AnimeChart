import axios from 'axios';
export default class Season{

    constructor(year,season){
        this.season = season;
        this.year = year;
        this.animes = [];
    }


    async getAnimes(){
        const res = await axios(`https://api.jikan.moe/v3/season/${this.year}/${this.season}`)

        if(res.status === 200){
            this.animes = res.data.anime;
        }
    }

}