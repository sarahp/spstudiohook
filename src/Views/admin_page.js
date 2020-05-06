import React, {Component} from "react";
import firebase, {auth, provider} from '../firebase.js';
import 'firebase/database';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import AddProject from '../components/add_project.js';
import DisplayProject from '../components/display_project.js';
import DeleteProject from '../components/delete_project.js';

class Admin extends Component {


// TODO Show the create project form, and all projects currently created.

    render() {
        return (
            <div className='admin_page'>
                <header>
                    <div className='wrapper'>
                        <div className='row'>
                            <h1 className='col-md-4'>Admin Page</h1>
                            <div className="login-button">
                                {this.state.user ?
                                    <button type="button" className='btn btn-link' onClick={this.logout}>Log
                                        Out</button>

                                    :

                                    <button type="button" className='btn btn-link' onClick={this.login}>Log In</button>
                                }
                            </div>
                        </div>
                    </div>
                </header>

                {this.state.user ?
                    <div className='container'>
                        <div className='project-admin row'>
                            <div className='user-profile col-md-4'>
                                <img src={this.state.user.photoURL}/>
                            </div>

                            <section className='add-project col-md-6'>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group notes">
                                        <input type="text" name="username" className="form-control"
                                               placeholder="What's your name?"
                                               defaultValue={this.state.user.displayName || this.state.user.email}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="projectTitle" className="form-control"
                                               placeholder="Project name?"
                                               value={this.state.projectTitle} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="client" className="form-control"
                                               placeholder="Client"
                                               onChange={this.handleChange} value={this.state.client}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="imageAlt" className="form-control"
                                               placeholder="Image alt text..." onChange={this.handleChange}
                                               value={this.state.imageAlt}/>

                                    </div>
                                    <div clasName="form-group">
                                        {this.state.isUploading && <p>Progress: {this.state.uploadProgress}</p>}
                                        {this.state.imageURL && <img src={this.state.imageURL}/>}
                                        <input type="image" name="image" className="form-control-file btn" value={
                                        <FileUploader
                                            accept="image/*"
                                            name="image"
                                            randomizeFilename
                                            storageRef={firebase.storage().ref("project_images")}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress}
                                            multiple
                                        />}
                                            />
                                        </div>

                                    <div className="form-group">
                                        <input type="link" name="projectLink" className="form-control"
                                               placeholder="Link to project" onChange={this.handleChange}
                                               value={this.state.projectLink}/>
                                    </div>
                                    <div className="form-group">
                                    <textarea name="description" form="project-input" className="form-control"
                                              placeholder="Project information" onChange={this.handleChange}
                                              value={this.state.description}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add Item</button>
                                </form>
                            </section>
                        </div>
                    </div>
                    :
                    <div className='wrapper'>
                        <p>You must be logged in to add a project.</p>
                    </div>
                }

                <section className='display-project col-md-8'>
                    <div className='wrapper'>
                            {this.state.projectInfo.map((info) => {
                                return (
                                    <div className="project-id" key={info.id}>
                                        <div id="project-display" key={info.id} className="carousel slide"
                                             data-ride="carousel">
                                        <div className="carousel-inner">
                                            <ul>
                                            <li>

                                        {info.imageURL &&
                                        info.imageURL.map(item => {
                                            return (
                                                <div className="carousel-item active">
                                                        <img className="d-block w-100" src={item} alt={info.imageAlt} />
                                                    </div>
                                            );
                                        })}
                                            </li>
                                            </ul>
                                        </div>
                                            <a className="carousel-control-prev" href="#project-display"
                                               role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#project-display"
                                               role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>

                                        <div className='title-info'>
                                            <ul>
                                            <li className="project-title"><h3>{info.projectTitle}</h3></li>
                                            </ul>
                                            <br/>
                                            <h4>Created by {info.user}</h4>
                                            {info.client}
                                            <br/>
                                            <a href={info.projectLink}>{info.projectLink}</a>
                                            <br/>
                                            {info.description}
                                            <br/>
                                            <br/>
                                            {this.state.user ?
                                                <button type="submit" className="btn btn-outline-danger"
                                                        onClick={() => this.removeItem(info.id)}>Remove project
                                                </button>
                                                :
                                                <div className="wrapper"> Login to manage projects</div>

                                            }
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </section>
            </div>
        );
    }
}

export default Admin;