import React, { useEffect, useState } from 'react';
import "../../styles/index.css"

const Playlist = () => {

    const [infoSongs, setInfoSongs] = useState(null);
    const List = []


    useEffect(() => {
        getInfoSongs();


    }, [])

    const getInfoSongs = async () => {
        let url = "https://assets.breatheco.de/apis/sound/songs";
        let options_get = {
            method: 'GET', // GET, POST, PUT, DELETE,
            //body: "", // POST, PUT 
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, options_get);
            const data = await response.json();
            console.log(data);
            setInfoSongs(data);

        } catch (error) {
            console.log(error.message);
        }
    }
    //   const actualizarLista = async(infoSongs) =>{
    //        if (infoSongs !== null){
    //         List.append( infoSongs.data/fx.json);
    //         List.append( infoSongs.data/songs.json);
    //         console.log(List);
    //        }  
    //     }
    return (

        <>
            <div className="container ">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center fw-bold">Audio player</h1>
                    </div>

                    {!!infoSongs &&
                        infoSongs.length > 0 ?
                        <ul class="list-group">
                            {
                                infoSongs.map((song, index) => {
                                    return (
                                        <li class="list-group-item Playlist text-center fst-italic" key={index} onClick={() => play(song.url, index)}> {index + 1}.- {song.name}</li>
                                    )
                                })} </ul> :
                        (
                            <div className="col-md-12 text-center">
                                Loading...
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Playlist;
