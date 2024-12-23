import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import FileSaver from "file-saver";

const QRCodePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleExport = () => {
    const canvas = document.getElementById("qrcode-canvas") as HTMLCanvasElement;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          FileSaver.saveAs(blob, "qrcode.png");
        }
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">QR Code Generator</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Entrez un texte pour générer un QR Code"
          className="w-3/4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleExport}
          disabled={!inputValue}
          className={`ml-4 px-4 py-2 rounded text-white ${
            inputValue ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Exporter
        </button>
      </div>
      <div className="bg-white p-4 shadow rounded flex justify-center">
        {inputValue ? (
          <QRCodeCanvas id="qrcode-canvas" value={inputValue} size={256} />
        ) : (
          <p className="text-gray-500">Entrez un texte pour générer un QR Code</p>
        )}
      </div>
    </div>
  );
};

export default QRCodePage;