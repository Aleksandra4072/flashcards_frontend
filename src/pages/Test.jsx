import { useState, useEffect } from "react";
import axios from "../api/axios";
import * as XLSX from "xlsx";
import { Workbook } from "@fortune-sheet/react";

import "@fortune-sheet/react/dist/index.css";

const Test = () => {
  const [filename, setFilename] = useState("excel.xlsx");
  const [sheetData, setSheetData] = useState([
    { name: "s1", celldata: [{ r: 0, c: 0, v: null }] },
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

            const celldata = [];
            const range = XLSX.utils.decode_range(worksheet['!ref']);

            for (let row = range.s.r; row <= range.e.r; row++) {
              for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = worksheet[cellAddress];

                if (cell) {
                  celldata.push({
                    r: row,
                    c: col,
                    v: cell.w || cell.v || "", // Use 'w' if available, fallback to 'v' or empty string
                  });
                }
              }
            }

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
