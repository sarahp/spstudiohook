import React, {Component} from "react";
import 'firebase/database';
import 'firebase/storage';
import firebase, {auth, provider} from "../firebase";


class AddProject extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            projectAll: '',
            image: '',
            imageAlt: '',
            imageURL: '',
            projectTitle: '',
            client: '',
            projectLink: '',
            description: '',
            isUploading: false,
            progress: 0,
            projectInfo: [],
            user: null

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });

    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    handleSubmit(e) {
        // alert('Your project was submitted: ' + this.state.value);
        e.preventDefault();
        const projectInfoRef = firebase.database().ref('projectInfo');
        const info = {
            user: this.state.displayName || this.state.user.email,
            imageAlt: this.state.imageAlt,
            imageURL: this.state.imageURL,
            image: this.state.image,
            projectTitle: this.state.projectTitle,
            client: this.state.client,
            projectLink: this.state.projectLink,
            description: this.state.description
        }
        projectInfoRef.push(info);
        this.setState({
            user: ''
        });
    }

// Image upload handler.

    handleUploadStart = () =>
        this.setState({
            isUploading: true,
            uploadProgress: 0
        });

    handleProgress = progress =>
        this.setState({
            progress
        });

    handleUploadError = error => {
        this.setState({
            isUploading: false
            // Todo: handle error
        });
        console.error(error);
    };

    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref("project_images")
            .child(filename)
            .getDownloadURL()

        this.setState(oldState => ({
            image: [...oldState.image, filename],
            imageURL: [...oldState.imageURL, downloadURL],
            uploadProgress: 100,
            isUploading: false
        }));
    };

}

export default AddProject;