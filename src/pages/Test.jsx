import { useState, useEffect } from "react";
import axios from "../api/axios";
import * as XLSX from "xlsx";
import { Workbook } from "@fortune-sheet/react";

import "@fortune-sheet/react/dist/index.css";

const Test = () => {
  const [filename, setFilename] = useState("excel.xlsx");
  const [sheetData, setSheetData] = useState([
    { name: "s", celldata: [{ r: 0, c: 0, v: null }] },
  ]);

  useEffect(() => {
    axios
      .get(`/download_file/${filename}`, {
        responseType: "blob",
      })
      .then((res) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const allSheetsData = workbook.SheetNames.map((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });  

            const celldata = json.flatMap((row, rowIndex) =>
                row.map((cell, colIndex) => ({
                  r: rowIndex,
                  c: colIndex,
                  v: typeof cell === 'number' || cell ? cell : null, // Ensure numbers and other values are correctly assigned
                }))
              );

              return {
                name: sheetName,
                celldata: celldata,
              };
            });
    

            setSheetData(allSheetsData); // Set all sheets data
        };

        reader.readAsArrayBuffer(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("Sheet have been initialized");
    console.log(sheetData);
  }, [sheetData]);

  return (
    <div style={{ width: "100%", height: "550px" }}>
      <Workbook
        key={sheetData[0]?.name}
        data={sheetData}
        showToolbar={true} // Set to true if you want to show the toolbar
        allowEdit={false} // Disable editing for read-only view
      />
    </div>
  );
};

export default Test;
