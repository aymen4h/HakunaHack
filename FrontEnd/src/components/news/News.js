import styleNews from './News.module.css';
import Navbar from '../navbar/Navbar';
import { useState, useEffect, useRef } from 'react';
import { getNews, createNewsCall, getMoeNewsCall } from '../../store/ApiCalls';
import { useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import ReactDOM from 'react-dom';



function News(){
    const [newsData, setNewsData] = useState();
    const [test, setTest] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [lastNews, setLastNews] = useState();
    const [moreNews, setMoreNews] = useState();
    const [tre,setTre] = useState(true);
    const navigate = useNavigate();
    
    

    function stopfun(){
        console.log("kdshkdsjfk");
    }
    
    const handleScroll = async (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        //console.log(scrollTop, clientHeight, scrollHeight);

        if (scrollTop + clientHeight + 10 >= scrollHeight) {
            let spinner = document.createElement('span');
            spinner.className = styleNews.loader;
            document.getElementsByClassName(styleNews.right)[0].appendChild(spinner);
            setTre(false);
            const res = await getMoeNewsCall(lastNews);
            if (res.status === 200) {
                const data = await res.json();

                setMoreNews(data);
                addMoreNews(data);
                
                
                if(data.length === 3){
                    setTre(true);
                    setLastNews(data[data.length - 1].createAt);
                }
            }
            else{
                console.log('no data')
            }
            e.target.removeChild(spinner);

            

            console.log("Vous avez atteint la fin de la page !");
        }
    };

    const createNews = async(e) => {
        e.preventDefault();
        const userObject = JSON.parse(localStorage.getItem('user'));
        const userId = userObject.userS.id;
        const data = await createNewsCall({
            userId: userId,
            description: description, 
            title: title
        });
    };

    const addMoreNews = (assba) => {
        console.log(assba)
        console.log(assba[0].userName)
        assba.map((newsItem) => {
                const divItem = document.createElement("div");
                divItem.className = styleNews.item;
                const divhead = document.createElement("div");
                divhead.className = styleNews.head;
        
                const poster = document.createElement("h1");
                poster.className = styleNews.poster;
                poster.innerText = newsItem.userName;
                
                const avatContainer = document.createElement("div");
                avatContainer.style.display = "inline";
                
                const date = document.createElement("p");
                date.className = styleNews.date;
                date.innerText = newsItem.createAt.split('T')[0];

                divhead.appendChild(avatContainer);
                divhead.appendChild(poster);
                divhead.appendChild(date);
                const title = document.createElement("h3");
                title.className = styleNews.title;
                title.innerText = newsItem.title;
        
                
        
                const description = document.createElement("p");
                description.className = styleNews.descr;
                description.innerText = newsItem.description;
        
                divItem.appendChild(divhead);
                divItem.appendChild(title);
                divItem.appendChild(description);
        
                document.getElementsByClassName(styleNews.right)[0].appendChild(divItem);
                ReactDOM.render(
                    <Avatar name={newsItem.userName} round={true} size='50' className={styleNews.ava} />,
                    avatContainer
                );
            });
        
        
    }
    

    useEffect(() => {
        const fet = async() => {
            const res = await getNews();
            if(res.status === 200){
                const data = await res.json();
                setNewsData(data);
                setTest(true);
                setLastNews(data[data.length - 1].createAt)
            }
            else if(res.status === 401){
                navigate('/login');
            }
            else{
                setTest(false);
            }
        };
        
        fet();
        
    },[])
    return(
        <>
            <Navbar />
            <div className={styleNews.container}>
                <div className={styleNews.left}>
                    <form onSubmit={createNews} id={styleNews.formm} >
                        <input type="text" placeholder='Enter The Title' name='title' id={styleNews.title} required onChange={(e) => setTitle(e.target.value)} />
            
                        <textarea id={styleNews.desc} placeholder='Enter The Description' name='desc' rows="8" required onChange={(e) => setDescription(e.target.value)} ></textarea>
            
                        <div id={styleNews.mtabtn}> <button type="submit" id={styleNews.submitbtn}>Send</button></div>
                    </form>
                </div>
                <div className={styleNews.right} onScroll={(e)=> {
                    if(tre){
                        handleScroll(e);
                    }
                     
                    }}>
                    {test && (
                        <>
                            {newsData.map((news, index) => 
                                <div key={index} className={styleNews.item}>
                                    <div className={styleNews.head}>
                                        <Avatar name={news.userName} className={styleNews.ava} round={true} size='50' />
                                        <h1 className={styleNews.poster}>
                                        {news.userName}
                                        </h1>
                                        <p className={styleNews.date}>
                                        {news.createAt.split('T')[0]}
                                        </p>
                                    </div>
                                    <h3 className={styleNews.title}>
                                    {news.title}
                                    </h3>
                                    
                                    <p className={styleNews.descr}>
                                    {news.description}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default News;