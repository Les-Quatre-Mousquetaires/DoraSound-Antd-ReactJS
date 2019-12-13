import React, { Component } from 'react'
import axios from 'axios';
import {Input, Button, Icon, Upload, message} from 'antd';

class UploadPage extends Component {
    
    
    constructor(props) {
        super(props);
       
        this.state = {
            previewVisible: true,
            previewImage: '',
            name: '',
            imageUpload: null,
            songUpload: null,
            isLoading: false
        };
        
        this.onChangeHandlerAudio = this.onChangeHandlerAudio.bind(this); 
        this.onChangeHandlerImage = this.onChangeHandlerImage.bind(this); 
        this.onChangeHandlerName = this.onChangeHandlerName.bind(this);
    }

    onChangeHandlerName(e)  {
        this.setState({
            name: e.target.value
        });
    }

    onChangeHandlerAudio(info)  {
        this.setState({
            songUpload: info.fileList,
        });
    }

    onChangeHandlerImage(info)  {
        this.setState({
            imageUpload: info.fileList,
        });
    }
     
    handleSubmit = e => {
        e.preventDefault();
        this.uploadAPI();
    }
    
    uploadAPI = async (e) => {
        this.setState({
            isLoading: true
        })

        const url = 'https://doraneko.tk/api/songs';
        let formData = new FormData();
        formData.append('songUpload', this.state.songUpload[0].originFileObj);
        formData.append('imageUpload', this.state.imageUpload[0].originFileObj);
        formData.append('name', this.state.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGVkZDk1NGYwOTExYTJjODIxMmM5NzAiLCJyb2xlIjoidXNlciIsImlhdCI6MTU3NTg4MzYzMywiZXhwIjoxNTc2NDg4NDMzfQ.c5EQBdRuLkglK99DLnAm4iQFRV2k8KIFoauCIG1_-jc'
            }
        }
        axios.post(url, formData, config).then((result) => {
            this.setState({
                isLoading: false
            });
            message.success('Upload successed !', 2.5);
        }).catch(error => {
            this.setState({
                isLoading: false
            });
            message.error('Upload failed', 2.5);
        });
    }

    handlePreview = file => {
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true
        });
    };
 
    render() {
        const { imageUpload, songUpload, isLoading } = this.state;
        
        return (
            <div>
                <Upload
                    listType='picture-card'
                    fileList={imageUpload} 
                    onPreview={this.handlePreview}
                    onChange={this.onChangeHandlerImage}
                    beforeUpload={() => false}
                    >
                        <Button>
                            <Icon type='upload'/> Upload your image
                        </Button>
                     
                   
                </Upload>
                <Upload accept='.mp3' 
                    name='songUpload' 
                    fileList={songUpload}
                    onChange={this.onChangeHandlerAudio} 
                    beforeUpload={() => false}>
                    <Button >
                        <Icon type='upload' /> upload your track
                    </Button>
                </Upload>
                    The name of the song:
                <Input type='text' 
                    name='name' 
                    onChange={this.onChangeHandlerName} />
                <Button type='primary' 
                    onClick={this.handleSubmit} loading={isLoading}
                >
                    Upload
                </Button> 
            </div>
                        
        )
    }
}
export default UploadPage;