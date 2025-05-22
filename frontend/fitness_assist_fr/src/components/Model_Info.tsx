import { useEffect, useState } from "react";
import type { ModelType } from "../types/ModelType";
import instance from "../axiosConfig";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Model_Info() {
    const [modelInfo, setModelInfo] = useState<ModelType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchModelInfo = async () => {
            try {
                const response = await instance.get("/model_info");
                if (!response) {
                    throw new Error("Network response was not ok");
                }
                const data = response.data;
                setModelInfo(data);
            } catch (error) {
                console.error("Error fetching model info:", error);
            }
        };
        fetchModelInfo();
    }
        , []);

    const handleRetrainModel = async () => {
        setIsSubmitting(true);
        try {
            const response = await instance.post('/retrain_model');
            alert(response.data.message);
        } catch (error) {
            console.error('Error retraining model:', error);
            alert('Error retraining model. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="model-info space-y-6">
            <motion.button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRetrainModel}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-live="polite"
                aria-label={isSubmitting ? "Retraining the model" : "Retrain the model"}
                type="button"
            >
                <span>
                    {isSubmitting ? "Retraining..." : "Retrain The Model"}
                </span>
                {isSubmitting && (
                    <svg
                        className="animate-spin h-5 w-5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        role="status"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
            </motion.button>
            <Link to="/" tabIndex={-1} aria-label="Go back to home">
                <motion.button
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                >
                    Get Back
                </motion.button>
            </Link>

            {modelInfo ? (
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Model Information</h2>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Model File Name:</p>
                            <p className="col-span-2 text-gray-800">{modelInfo.model_file_name}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Dataset File:</p>
                            <p className="col-span-2 text-gray-800">{modelInfo.dataset_file_name}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Version:</p>
                            <p className="col-span-2 text-gray-800">{modelInfo.version}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Accuracy:</p>
                            <p className="col-span-2 text-gray-800">
                                <span className="bg-green-100 text-green-800 py-1 px-2 rounded-md font-medium">
                                    {modelInfo.accuracy}
                                </span>
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Status:</p>
                            <p className="col-span-2 text-gray-800">
                                <span className={`py-1 px-2 rounded-md font-medium ${modelInfo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {modelInfo.status}
                                </span>
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="text-gray-600 font-medium">Created At:</p>
                            <p className="col-span-2 text-gray-800">{modelInfo.created_at}</p>
                        </div>
                    </div>
                </motion.div>
            ) : (isSubmitting ?
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center min-h-[200px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-500 font-medium">Loading model information...</p>
                    </div>
                </motion.div>
                :

                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center min-h-[200px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-gray-500 font-medium mb-4">No model information available. Please submit an input.</p>
                    <Link to="/">
                        <motion.button
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                        >
                            Get Back
                        </motion.button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}