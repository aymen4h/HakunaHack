import styleMap from './Map.module.css';
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import { getPlaces, createPlaceCall } from '../../store/ApiCalls';
import { useNavigate } from 'react-router-dom';
import imgMap from './hakuna.png';
function Map(){
    const [places, setPlaces] = useState();
    const [test, setTest] = useState(false);
    const [inpu,setInpu] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const navigate = useNavigate();

    const doubleclique = (e) => {
        e.preventDefault();
        document.getElementById(styleMap.create).hidden = false;
        document.getElementById(styleMap.create).style.top = `${e.clientY}px`;
        document.getElementById(styleMap.create).style.left = `${e.clientX}px`;
        const longi = e.clientY - e.target.offsetTop;
        const lalt = e.clientX - e.target.offsetLeft;
        setLatitude(lalt);
        setLongitude(longi);
    }
    const createPlace = async(e) => {
        e.preventDefault();
        const userObject = JSON.parse(localStorage.getItem('user'));
        const userId = userObject.userS.id;
        await createPlaceCall({
            userId: userId,
            comment: inpu,
            longitude: longitude,
            latitude: latitude
        })
    }


    useEffect(() => {
        const fet = async() => {
            const res = await getPlaces();
            if(res.status === 200){
                const data = await res.json();
                setPlaces(data);
                setTest(true);
            }
            else if(res.status === 401){
                navigate('/login');
            }
            else{
                setTest(false);
            }
        }
        fet();
        
    },[])
    return(
        <>
            <Navbar />
            <div className={styleMap.container}>


                <form id={styleMap.create} hidden onSubmit={createPlace}  >
                    <input className={styleMap.inputC} name='inpu' onChange={(e) => setInpu(e.target.value)} />
                    <input type='submit' value='Create' className={styleMap.btncreate}  />
                </form>








                <img src={imgMap} alt='erreur' onDoubleClick={doubleclique} id={styleMap.imgMap} 
                    onClick={() => document.getElementById(styleMap.create).hidden = true }
                />
                {test && (                                          
                    <>
                        {places.map((place, index) => 
                            <div key={index} className={styleMap.place} 
                            style={{top: place.longitude - 50 + document.getElementById(styleMap.imgMap).offsetTop + "px",
                                 left: place.latitude - 22 + document.getElementById(styleMap.imgMap).offsetLeft + "px"}} 
                            onMouseEnter={() => {document.getElementById("des" + index).hidden = false;}}
                            onMouseLeave={() => document.getElementById("des" + index).hidden = true}
                            >
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEjklEQVR4nO2aTWwbRRTHl/KlIk6oUi9U4sSJC+ISCWpvYnu/PPvlzcy44sAFIhAHLpy4BHEECbhwQuodwQ0plSipoSokgSRtk7hq0jQlaVIHt6Su00CaJn5olqy1meyuHRWvN1Kf9Jcsa97q/TR+b94bryA8tmiDwcGnmITDbPcs662qZdWrlrVRc5z3hcNmNct67Y5lXb9lGODXbctarWP8hpB0q2H8wpptD90yjAYP4aliGLBmWSPrxeJxIYkGhOg1266FAfBaNYztu4XCVyAIR4QkGBSLrwIh54FSYNoihP2E2oJhqprm/bptv91NgONA6ddAyI4H4ddGfz+smmZLkBXDgHmEYBGhd+MFGBh4Gij9ACitBQH41SAE6oWCmxf7AHSdBQ8XZRnGJQlmFOXvWMs0EDLXCoDXQ0JgzbabEMuGAdOK4gL4tZDPn44PhB4Mwq9NjOFaPr8PwNMlSdq5adsvJh6EqWKaoSBM8wiNdh2kQSn8gZCrRsSaGVUNBZmQJJY7UtdAWMn9qbcXvj950hX7DIQMB629a9uRu3JVVStdAfk9l2sC+OWuJ0QHQuZ5n7mIXBlnu5LPfxQ7SBCEB+L6KMqzQMik3+ef/n6Y2C29QZpS1c2lnp6jiQJx/QhJ8X5Luh65KwsIfdtVkAuZDDvgWNJ/wfl+4/fbJgQuBZwn47ualKTGsqq+HDvIsCi6AF4gl2V5ewWhYz7fE0Dpht+32qIcz+XzU50BCeithtJpFjRcDAjkOkLDnP8nfDkuh5TjSZYrstzoDAilZ3mQK5oW/vOQZbhp2z1Nf4yPAqWLfn/Wj/F+04oCv2azUOrthc6AEFLkQf5qcS7MatoN7hlv8s+Y3y3HbGcnJMkF8NQZEFZKKb3DB3I1Ylfcc0HX32s+QxCeCOrDGAQ7SEucOgLiBkLIl3wgG44TCXJFVddXEHouqmjwAKUYQF4JCuQGQsGVR9NY0rM2fatimp8nBoQZEDLKB7KFcXNQYiprmttAzmraHi3qejU5IJQOhLXp7JBjAGwnZkOUHBCMnwdK14Pa9D8tKxQgcSDMgNLTQQExPcAYlnV9HwDrr1iFShYIIa+HgXi67zis+XOT/V6hELk2COKXTGan4yAuDKXldm5TmFqt8wP8LIowms02yrL8cVwgH7YKsF15EGPZLJwVRXbC7+nTOgty6tQxoHTz/wAZyWTgfF/ff6NAX1+llE7H+3cEUPrdo0KsmKZ/HHgwpyjxXAtxIOqjQNQdB4ZSKRdiKJVqTCuKHjuECzI4eIRvzdsV6wbOiWJzN6YU5dOuQIQNTO2IVbIx3w3MeC53rqsQzIDSl8Ju5sPEBrLmnN+N5D7I9BgmdkPvT+5rpnlCSIpBwPQYpHXHgTPpdPeTO8wA42eAkNsHSe7LsvyZkESDgOlxT3Jns/7kLglJNQiZHhOd3GEGlI5FJfePSUvuMAOM3+FP7jO7J/cPoviwnM9rwmEw8E2PXnKzFuS3XG5kSteT+aJA1PToJfeFTGZ1BqHkv7oRNj0uIbQwo6qH72Ua3gDjJ/d9+diEtuxftkrkYmLyrxgAAAAASUVORK5CYII=" />
                                <h3 className={styleMap.des} hidden id={"des"+ index}>
                                    {place.comment}
                                </h3>
                            </div>
                        )}
                    </>
                )}
                
            </div>
        </>
    )
}
export default Map;