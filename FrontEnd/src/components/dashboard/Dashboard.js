import { useNavigate } from "react-router-dom";
import styleDashboard from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { acceptNews, removeNews, NewsForAdminCall, PlacesForAdminCall, acceptPlaces, removePlaces } from "../../store/ApiCalls";
import Navbar from '../navbar/Navbar';
import Avatar from 'react-avatar';

function Dashboard(){
    const [nop, setNop] = useState(true);
    const [newsData, setNewsData] = useState();
    const [placesData, setPlacesData] = useState();
    const navigate = useNavigate();

    const acceptfN = async(id) => {
        const res = await acceptNews(id);
    }
    const deletefN = async(id) => {
        const res = await removeNews(id);
    }
    const acceptfP = async(id) => {
        const res = await acceptPlaces(id);
    }
    const deletefP = async(id) => {
        const res = await removePlaces(id);
    }

    useEffect(() =>{
        const appel = async() => {
            const res = await NewsForAdminCall();
            const res1 = await PlacesForAdminCall();
            if(res.status === 200){
                const data = await res.json();
                setNewsData(data);
                const data1 = await res1.json();
                setPlacesData(data1);
                console.log(data1)
            }
            else if(res.status === 401){
                navigate('/login');
            }
        }
        appel();
    },[]);
    return(
        <>
            <Navbar />
            <div className={styleDashboard.container}>
                <div className={styleDashboard.left}>
                    <div className={styleDashboard.posf}>
                        <h1 className={styleDashboard.h1news} onClick={()=>setNop(true)} >News</h1>
                        <h1 className={styleDashboard.h1place} onClick={()=>setNop(false)} >Danger Places</h1>
                    </div>
                </div>
                <div className={styleDashboard.right}>
                    {nop && newsData && (
                        <>
                            {newsData.map((news) => 
                                <div className={styleDashboard.newsitem}>
                                        <div className={styleDashboard.head}>
                                            <Avatar name={news.userName}  round={true} size='50' />
                                            <h1 className={styleDashboard.poster}>
                                            {news.userName}
                                            </h1>
                                            <p className={styleDashboard.date}>
                                            {news.createAt.split('T')[0]}
                                            </p>
                                        </div>
                                    <h3 className={styleDashboard.title}>
                                    {news.title}
                                    </h3>
                                    
                                    <p className={styleDashboard.descr}>
                                    {news.description}
                                    </p>
                                    <button className={styleDashboard.accept} onClick={() => acceptfN(news.id)} >Accept</button>
                                    <button className={styleDashboard.delete} onClick={() => deletefN(news.id)} >Delete</button>
                                </div>
                            )}
                        </>
                    )}
                    {!nop && placesData && (
                        <>
                            {placesData.map((place) => 
                                <div className={styleDashboard.placeitem}>
                                    <div className={styleDashboard.head}>
                                            <Avatar name={place.userName}  round={true} size='50' />
                                            <h1 className={styleDashboard.poster}>
                                            {place.userName}
                                            </h1>
                                            <p className={styleDashboard.date}>
                                            {place.creatAt.split('T')[0]}
                                            </p>
                                    </div>
                                    
                                    <h2 className={styleDashboard.comment}>
                                    {place.comment}
                                    </h2>
                                    <h3 className={styleDashboard.long}>
                                    longitude: {place.longitude}
                                    </h3>
                                    <h3 className={styleDashboard.lat}>
                                    latitude: {place.latitude}
                                    </h3>
                                    <button className={styleDashboard.accept} onClick={() => acceptfP(place.id)} >Accept</button>
                                    <button className={styleDashboard.delete} onClick={() => deletefP(place.id)} >Delete</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Dashboard;