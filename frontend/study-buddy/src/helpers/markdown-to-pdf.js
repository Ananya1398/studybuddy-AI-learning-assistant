import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPdfFromHtml = async (
  htmlContent,
  filename = "document.pdf"
) => {
  // Create a temporary container for the HTML content
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px"; // Move off-screen
  tempDiv.innerHTML = htmlContent;
  document.body.appendChild(tempDiv);

  try {
    // Capture the HTML as a canvas
    const canvas = await html2canvas(tempDiv);
    const imgData = canvas.toDataURL("image/png");

    // Calculate PDF dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    // Clean up the temporary element
    document.body.removeChild(tempDiv);
  }
};
