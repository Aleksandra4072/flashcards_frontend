import { useEffect, useState, useCallback, useRef, act } from "react";
import { Workbook } from "@fortune-sheet/react";

import axios from "../api/axios";

const ServersideChunks = () => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSheetNames = async () => {
      try {
        setLoading(true);
        let updatedData = [];
        const res = await axios.get("/sheet_list");

        for (const sn of res?.data || []) {
          const sheet = await fetchSheetData(sn);
          updatedData = [...updatedData, sheet];
          setSheetData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetNames();
  }, []);

  const fetchSheetData = async (sn) => {
    const res = await axios.get(`/sheet_data/${sn}`);
    return res.data;
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      {/* <p>Selected Range: {selectedRange}</p> */}
      {sheetData.length > 0 && <Workbook key={loading} data={sheetData} showToolbar={false} readonly={true} />}
    </div>
  );
};

export default ServersideChunks;
