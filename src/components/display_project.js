import React, {Component} from "react";
import 'firebase/database';
import 'firebase/storage';
import
import firebase, {auth} from '../firebase.js';
import {
    RecoilRoot,
    atom,
    useRecoilState,
} from 'recoil';


 function DisplayProject () {

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {

                this.setState({user});

            }
        });
        const projectInfoRef = firebase.database().ref('projectInfo');
        projectInfoRef.on('value', (snapshot) => {
            let projectInfo = snapshot.val();
            console.log(snapshot.val());
            let newState = [];
            for (let info in projectInfo) {
                newState.push({
                    id: info,
                    user: projectInfo[info].user,
                    projectTitle: projectInfo[info].projectTitle,
                    client: projectInfo[info].client,
                    projectLink: projectInfo[info].projectLink,
                    description: projectInfo[info].description,
                    image: projectInfo[info].image,
                    imageURL: projectInfo[info].imageURL,
                    imageAlt: projectInfo[info].imageAlt
                });
            }

            this.setState({
                projectInfo: newState
            });
        });

    };

}

export default DisplayProject;