import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff"); // Default white background
  const [color, setColor] = useState("#000000"); // Default black QR color
  const qrRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setBgColor("#ffcccc"); // Light red to indicate missing input
      setColor("#808080"); // Gray QR as placeholder
    } else {
      setBgColor("#ffffff");
      setColor("#000000");
    }
  }, [text]);

  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Canvas element not found");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* QR Code Display */}
        <div className="flex flex-col justify-center items-center bg-gray-200 p-6 w-full md:w-1/2">
          <div ref={qrRef} className="p-4 bg-white shadow-lg rounded-lg">
            <QRCodeCanvas
              value={text || "Enter text"}
              size={250}
              level="Q"
              bgColor={bgColor}
              fgColor={color}
            />
          </div>
        </div>

        {/* QR Code Controls */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 bg-white space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">QR Code Generator</h2>
          
          <input
            type="text"
            placeholder="Enter text or URL"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="flex flex-col w-full space-y-2">
            <label className="text-gray-700">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="cursor-pointer"
            />
          </div>
          
          <div className="flex flex-col w-full space-y-2">
            <label className="text-gray-700">QR Code Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="cursor-pointer"
            />
          </div>
          
          <button
            onClick={downloadQR}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
