import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Master from '../Master'
import { PageLoader } from '../../Components/PageLoader';
import globalData from "../../data/data";
const EditArticle = () => {
  const [tag, setTag] = useState([]);
  const [language, setLanguage] = useState([]);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState({});
  const [description, setDescription] = useState({});
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loader, setLoader] = useState(true);

  const [dbImage, setDbImage] = useState("");
  const [dbTags, setDbTags] = useState([]);
  const [dbLanguages, setDbLanguages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const promises = [];
      promises.push(await axios.get("/auth/article/tag-language"));
      promises.push(await axios.get("/auth/article/" + id));
      Promise.all(promises).then((res) => {
        setLoader(false);
        setTag(res[0].data.tag);
        console.log(tag);
        setLanguage(res[0].data.language);

        const { data } = res[1];
        setTitle(data.title);
        setDbImage(data.image);
        setDescription(data.description);
        setDbTags(data.tags);
        console.log(dbTags);
        setDbLanguages(data.languages);
      });
    };

    getData();
  }, []);

  const selectedTags = () => {
    const data = [];
    tag.map((sTag) => {
      dbTags.map((sDbTag) => {
        if (sDbTag.slug == sTag.value) {
          data.push(sTag); 
        }
      });
    });
    setTags(data);
    return data;
  };

  const selectedLanguages = () => {
    const data = [];
    language.map((sTag) => {
      dbLanguages.map((sDbTag) => {
        if (sDbTag.slug == sTag.value) {
          data.push(sTag); //
        }
      });
    });
    setLanguages(data);
    return data;
  };

  /* store */
  const store = () => {
    var data = new FormData();
    data.append("title", title);
    data.append("image", image);
    data.append("description", description);
    data.append("tags", JSON.stringify(tags));
    data.append("languages", JSON.stringify(languages));
    axios.post("/auth/article/" + id, data).then((d) => {
      if (d.data) {
        setDbImage(d.data);
        toast.success("Article updated");
        return;
      }
      toast.error("Wrong Something");
    });
  };
  return (
    <Master>
     
      
        <>
          <div className="row mt-3">
            <div className="col-6">
              <input
                type="text"
                className="form-control bg-dark"
                placeholder="enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="  col-6">
              <input 
                type="file"
                name="image"
                className="form-control bg-dark"
                onChange={(e) => setImage(e.target.files[0])}
                
              />
             <img
                src={`${globalData.host}/images/${dbImage}`}
                style={{ width: 80 }}
              /> 
            </div>
            <div className="col-6">
              <Select
                options={tag}
                placeholder="choose tags"
                isMulti={true}
                onChange={(data) => setTags(data)}
                className="mt-2"
                defaultValue={selectedTags}
              />
            </div>
            <div className="col-6">
              <Select
                options={language}
                placeholder="choose languages"
                isMulti={true}
                className="mt-2"
                onChange={(data) => setLanguages(data)}
                defaultValue={selectedLanguages}
              />
            </div>
            <div className="col-12">
              <ReactQuill
                className="mt-2"
                value={description}
                theme="snow"
                onChange={setDescription}
              />
            </div>
          </div>
          <div className="text-center">
          <button className="btn btn-primary mt-2 mb-3 " onClick={store} >
            Change
          </button>
          </div>
        </>
    </Master>
  );
};

export default EditArticle;
