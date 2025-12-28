// import React, { useEffect, useRef, useState } from "react";
// import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
// import ErrorBoundary from "./ErrorBoundary"; // import fixed ErrorBoundary

// const ScannerPage: React.FC = () => {
//   const scannerRef = useRef<Html5QrcodeScanner | null>(null);
//   const [scannedResult, setScannedResult] = useState<string | null>(null);
//   const divId = "qr-scanner";

//   useEffect(() => {
//     if (scannerRef.current) return;

//     scannerRef.current = new Html5QrcodeScanner(
//       divId,
//       {
//         fps: 10,
//         qrbox: 250,
//         rememberLastUsedCamera: true,
//         supportedScanTypes: [Html5QrcodeScanType.QR_CODE], // ✅ enum
//       },
//       false
//     );

//     scannerRef.current.render(
//       (decodedText: string) => {
//         console.log("Scanned:", decodedText);
//         setScannedResult(decodedText);
//         scannerRef.current?.clear(); // stop after first scan
//       },
//       (error: unknown) => {
//         console.warn("Scan failed:", error);
//       }
//     );

//     return () => {
//       scannerRef.current?.clear();
//       scannerRef.current = null;
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
//       <div
//         id={divId}
//         className="border-2 border-gray-300 rounded-md w-full max-w-md h-80"
//       />
//       {scannedResult && (
//         <p className="mt-4 text-green-600 font-semibold">
//           Scanned Result: {scannedResult}
//         </p>
//       )}
//     </div>
//   );
// };

// // ------------------- Export with Error Boundary -------------------
// export default function ScannerPageWithBoundary() {
//   return (
//     <ErrorBoundary>
//       <ScannerPage />
//     </ErrorBoundary>
//   );
// }
