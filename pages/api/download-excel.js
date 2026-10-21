import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "Professional_Sales_Inventory_Analyst.xlsx");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const fileName = "Professional_Sales_Inventory_Analyst.xlsx";

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Length", fileBuffer.length);

  return res.send(fileBuffer);
}
