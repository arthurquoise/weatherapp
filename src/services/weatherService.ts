export default {
    async getCityName(cityName: string){
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cdd56bec583a5a5272a16663b88524af&lang=fr&units=metric`)
        const data = await apiCall.json();
        console.log(data);
        return data;
    }
}