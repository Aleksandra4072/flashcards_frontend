import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { Workbook } from "@fortune-sheet/react";
import ExcelJS from "exceljs";

import "@fortune-sheet/react/dist/index.css";

const Test = () => {
  const [selectedRange, setSelectedRange] = useState("");
  const [sheetData, setSheetData] = useState([
    { name: "s1", celldata: [{ r: 0, c: 0, v: null }] },
  ]);

  useEffect(() => {
    axios
      .get(`/download_file/excel.xlsx`, { responseType: "blob" })
      .then(async (res) => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(res.data);
        const allSheetsData = workbook.worksheets.map((worksheet) => {
          const celldata = [];
          const borderInfo = [];

          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              celldata.push({
                r: rowNumber - 1,
                c: colNumber - 1,
                v: {
                  v: cell.text,
                  bl: cell.style.font?.bold,
                  fs: cell.style.font?.size,
                  bg: getBackgroundColor(cell) || "#ffffff",
                },
              });

              borderInfo.push({
                rangeType: "cell",
                value: {
                  row_index: rowNumber - 1,
                  col_index: colNumber - 1,

                  l: cell?.style?.border?.left
                    ? {
                        style: borderStyle(cell.style.border.left),
                        color: "rgb(0, 0, 0)",
                      }
                    : undefined,
                  r: cell?.style?.border?.right
                    ? {
                        style: borderStyle(cell.style.border.right),
                        color: "rgb(0, 0, 0)",
                      }
                    : undefined,
                  t: cell?.style?.border?.top
                    ? {
                        style: borderStyle(cell.style.border.top),
                        color: "rgb(0, 0, 0)",
                      }
                    : undefined,
                  b: cell?.style?.border?.bottom
                    ? {
                        style: borderStyle(cell.style.border.bottom),
                        color: "rgb(0, 0, 0)",
                      }
                    : undefined,
                },
              });
            });
          });

          return {
            name: worksheet.name,
            celldata: celldata,
            config: {
              borderInfo: borderInfo,
            },
          };
        });

        setSheetData(allSheetsData);
      });
  }, []);

  const borderStyle = (style) => {
    switch (style) {
      case "thin":
        return 1;
      case "medium":
        return 2;
      case "thick":
        return 3;
      default:
        return 0;
    }
  };

  const getBackgroundColor = (cell) => {
    if (cell.fill && cell.fill.fgColor && cell.fill.fgColor.argb) {
      const argb = cell.fill.fgColor.argb;
      return `#${argb.substring(2)}`; // Convert ARGB to RGB hex
    }
    return null;
  };

  useEffect(() => {
    // Function to get the value from the div
    const getSelectedRange = () => {
      const nameBox = document.querySelector('.fortune-name-box');
      if (nameBox) {
        return nameBox.textContent;
      }
      return '';
    };

    // Initial check
    setSelectedRange(getSelectedRange());

    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          setSelectedRange(getSelectedRange());
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <p>Selected Range: {selectedRange}</p>
      <Workbook
        key={sheetData[0]?.name}
        data={sheetData}
        showToolbar={false}
        allowEdit={false}
        onChange={(luckysheet) => console.log("selection was chnged")}
      />
    </div>
  );
};

export default Test;
