import { useEffect, useState } from "react";
import type { RecentType } from "../types/RecentType";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import instance from "../axiosConfig";

export default function RecentInputs() {
    const [recentRecords, setRecentRecords] = useState<RecentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecentRecords = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await instance.get("/recent");
                if (!response.data) {
                    throw new Error("Failed to fetch recent records");
                }
                
                setRecentRecords(response.data);
            } catch (error) {
                setError("Error fetching recent records: " + error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentRecords();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Recent Fitness Plans</h2>
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </motion.button>
                </Link>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="p-8 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    {recentRecords.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No records found. Create a fitness plan to see your history.
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.weight}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.age}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.goal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.activity_level}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{record.plan}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

