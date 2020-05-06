import React, {Component} from "react";
import 'firebase/database';
import 'firebase/storage';
import firebase from "../firebase";


class DeleteProject extends Component {
    removeItem(infoID) {
        const projectInfoRef = firebase.database().ref(`/projectInfo/${infoID}`);
        projectInfoRef.remove();

        // const imageRemove = projectInfoRef('/project_images/${infoID}');
        // imageRemove.delete().then(function () {
        //     // File deleted successfully.
        // }).catch(function (error) {
        //     // Uh-oh, an error occurred.
        // });
    };
}

export default DeleteProject;