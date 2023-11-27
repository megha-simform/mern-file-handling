import "./App.css";
import UploadImage from "../src/components/UploadImage";
// import MediaStreaming from "./components/media-streaming";
import Rplayer from "./components/Rplayer"
function App() {
  return (
    <>
      <div>
        <UploadImage />
        <hr/>
        {/* <MediaStreaming/> */}
        <Rplayer />
      </div>
    </>
  );
}

export default App;
