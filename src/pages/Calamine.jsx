import { useEffect, useState, useCallback, useRef, act } from "react";
import { Workbook } from "@fortune-sheet/react";

import axios from "../api/axios";

const Calamine = () => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSheetNames = async () => {
      try {
        setLoading(true);
        const wb = await fetchSheetData();
        setSheetData(wb);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetNames();
  }, []);

  const fetchSheetData = async (sn) => {
    const res = await axios.get("/sheet_data_calamine");
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

export default Calamine;