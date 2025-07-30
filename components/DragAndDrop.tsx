import { useRef, useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

interface DragAndDropProps {
  handleFileChange: (value: any) => void;
  loading: boolean;
  error: any;
}

const DragAndDropFileUpload = ({
  handleFileChange,
  loading,
  error,
}: DragAndDropProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>("");

  const handleButtonClick = () => {
    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.click();
  };

  const onFileChange = (event: any) => {
    if (event.target.files.length > 0) {
      processFile(event.target.files[0]);
    }
  };

  const processFile = (file: any) => {
    if (file.type !== "application/pdf") {
      setLocalError("Only PDF files are supported.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setLocalError("File size exceeds 25MB. Please upload a smaller file.");
      return;
    }

    setLocalError("");
    handleFileChange(file);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-3/4">
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
      <div
        onClick={handleButtonClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-gray-200 w-full py-20 flex items-center justify-center flex-col border-2 rounded-lg space-y-3 cursor-pointer h-[250px] transition-all ${
          dragging
            ? "border-green-500 border-dashed bg-gray-300"
            : "border-gray-400 border-dashed"
        }`}
      >
        {!loading ? (
          <>
            <BsFillCloudUploadFill
              size={50}
              color={dragging ? "#3BC3A4" : "#99A1AF"}
            />
            <p className="text-black/60 max-w-[150px] text-sm text-center">
              Drag & drop or click to choose files
            </p>
          </>
        ) : (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-400 fill-[#3BC3A4]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-between flex-row">
        <p className="text-sm text-gray-400">Supported Formats: PDF</p>
        <p className="text-sm text-gray-400">Max: 25MB</p>
      </div>
      {localError && <p className="text-red-500 mt-4">{localError}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default DragAndDropFileUpload;
