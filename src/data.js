import axios from 'axios';

export default axios.create(
    {
        baseURL: "https://rich-text-editor-2a702-default-rtdb.asia-southeast1.firebasedatabase.app/"
    }
);