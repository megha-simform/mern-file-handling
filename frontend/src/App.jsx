import "./App.css";
import UploadImage from "../src/components/UploadImage";
import MediaStreaming from "./components/media-streaming";
function App() {
  return (
    <>
      <div>
        <UploadImage />
        <hr/>
        <MediaStreaming/>
      </div>
    </>
  );
}

export default App;
