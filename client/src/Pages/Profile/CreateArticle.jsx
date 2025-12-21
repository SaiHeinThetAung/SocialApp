import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { PageLoader } from '../../Components/PageLoader';

const CreateArticle = () => {
  const [tag, setTag] = useState([]);
  const [language, setLanguage] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState({});
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    axios.get('/auth/article/tag-language').then((d) => {
      setLoader(false);
      setTag(d.data.tag);
      setLanguage(d.data.language);
    });
  }, []);

  useEffect(() => {
    // Update form validity
    setIsFormValid(
      title.trim() !== '' &&
      image.name &&
      selectedTag.length > 0 &&
      selectedLanguage.length > 0 &&
      description.trim() !== ''
    );
  }, [title, image, selectedTag, selectedLanguage, description]);

  const store = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('tags', JSON.stringify(selectedTag));
    formData.append('languages', JSON.stringify(selectedLanguage));
    formData.append('description', description);
    axios.post("/auth/article", formData).then((d) => {
      if (d.data === "success") {
        toast.success("Article Created");
        return;
      } else {
        console.log(d.data);
      }
    });
  };

  return (
    <>
      {loader && <PageLoader />}
      {!loader && (
        <>
          <div className="col-6 mt-2">
            <input type="text" className='form-control bg-dark' placeholder='Title' onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="col-6 mt-2">
            <input type="file" className='form-control bg-dark' name='image' onChange={e => setImage(e.target.files[0])} />
          </div>
          <div className="col-6 mt-2">
            <Select options={tag} placeholder='choose tag' isMulti={true} onChange={data => setSelectedTag(data)} />
          </div>
          <div className="col-6 mt-2">
            <Select options={language} placeholder='choose language' isMulti={true} onChange={data => setSelectedLanguage(data)} />
          </div>
          <div className="col-12 mt-2">
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>
          <div style={{ margin: 'auto' }}>
            <span
              className={`btn btn-primary m-3 ${isFormValid ? '' : 'disabled'}`}
              onClick={isFormValid ? store : null}
            >
              Create
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default CreateArticle;
