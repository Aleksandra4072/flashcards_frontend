import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Workbook } from "@fortune-sheet/react";
import * as XLSX from "xlsx-js-style";
import ExcelJS from "exceljs";
import "@fortune-sheet/react/dist/index.css";

const ChunkedTransfer = () => {
  const [selectedRange, setSelectedRange] = useState("");
  const [sheetData, setSheetData] = useState([{ name: "s1", celldata: [{ r: 0, c: 0, v: null }] }]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchExcelFile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/excel`, {
          responseType: "arraybuffer",
          onDownloadProgress: (progressEvent) => {
            //Loading progress
            setProgress(Math.round(progressEvent.progress * 100))
          },
        });

        const buffer = response.data;

        // Process with ExcelJS
        const excelJsWb = new ExcelJS.Workbook();
        await excelJsWb.xlsx.load(buffer);

        const excelJsSheets = {};
        excelJsWb.eachSheet((worksheet, sheetId) => {
          excelJsSheets[worksheet.name] = worksheet;
        });

        // Process with xlsx-js-style
        const wb = XLSX.read(new Uint8Array(buffer), { type: "array", cellStyles: true });
        const data = wb.SheetNames.map((sn) => {
          const ws = wb.Sheets[sn];
          const celldata = [];
          const borderInfo = [];
          const range = XLSX.utils.decode_range(ws["!ref"]);

          for (let row = range.s.r; row <= range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
              const cell = ws[cellAddress];

              console.log(cell)

              if (cell) {
                const excelJsWs = excelJsSheets[sn];
                const excelJsCell = excelJsWs.getCell(row + 1, col + 1);
                const excelJsStyle = excelJsCell.style || {};

                let cellValue = { v: cell.w !== "#VALUE!" ? (cell.w || cell.v || "") : "<Image>"};

                celldata.push({
                  r: row,
                  c: col,
                  v: {
                    ...cellValue,
                    bg: `#${cell?.s?.fgColor?.rgb}` || "#FFFFFF",
                    bl: excelJsStyle?.font?.bold,
                    fs: excelJsStyle?.font?.size,
                  },
                });

                borderInfo.push({
                  rangeType: "cell",
                  value: {
                    row_index: row,
                    col_index: col,
                    l: excelJsStyle?.border?.left?.style
                      ? {
                          style: borderStyle(excelJsStyle?.border?.left?.style),
                          color: "rgb(0, 0, 0)",
                        }
                      : undefined,
                    r: excelJsStyle?.border?.right?.style
                      ? {
                          style: borderStyle(excelJsStyle?.border?.right?.style),
                          color: "rgb(0, 0, 0)",
                        }
                      : undefined,
                    t: excelJsStyle?.border?.top?.style
                      ? {
                          style: borderStyle(excelJsStyle?.border?.top?.style),
                          color: "rgb(0, 0, 0)",
                        }
                      : undefined,
                    b: excelJsStyle?.border?.bottom?.style
                      ? {
                          style: borderStyle(excelJsStyle?.border?.bottom?.style),
                          color: "rgb(0, 0, 0)",
                        }
                      : undefined,
                  },
                });
              }
            }
          }

          return {
            name: sn,
            celldata: celldata,
            config: {
              borderInfo: borderInfo,
            },
          };
        });

        setSheetData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error processing Excel file:", error);
      }
    };

    fetchExcelFile();
  }, []);

  const borderStyle = (style) => {
    switch (style) {
      case "thin":
        return 1;
      case "medium":
        return 8;
      case "thick":
        return 13;
      default:
        return 0;
    }
  };

  useEffect(() => {
    // Function to get the value from the div
    const getSelectedRange = () => {
      const nameBox = document.querySelector(".fortune-name-box");
      if (nameBox) {
        return nameBox.textContent;
      }
      return "";
    };

    // Initial check
    setSelectedRange(getSelectedRange());

    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "characterData") {
          setSelectedRange(getSelectedRange());
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return loading ? (
    <div>Loading the file: {progress}</div>
  ) : (
    <div style={{ width: "100%", height: "500px" }}>
      <p>Selected Range: {selectedRange}</p>
      <Workbook key={sheetData[0]?.name} data={sheetData} showToolbar={false} allowEdit={false} />
    </div>
  );
};

export default ChunkedTransfer;
