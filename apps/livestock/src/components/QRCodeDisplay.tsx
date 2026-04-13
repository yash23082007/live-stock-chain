'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ScanLine } from 'lucide-react';

interface QRCodeDisplayProps {
  animalId: string;
  tagNumber: string;
}

export function QRCodeDisplay({ animalId, tagNumber }: QRCodeDisplayProps) {
  // Assuming the app is deployed, this would dynamically get the base URL
  const verifyUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/verify/${animalId}`
    : `https://livestockchain.app/verify/${animalId}`;

  const downloadQR = () => {
    const canvas = document.getElementById(`qr-${animalId}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `cow-tag-${tagNumber}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto text-center border-dashed border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <ScanLine className="w-5 h-5 text-blue-600" />
          Public Provenance QR
        </CardTitle>
        <CardDescription>
          Scan to view blockchain history for Tag #{tagNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="p-4 bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
          <QRCodeSVG
            id={`qr-${animalId}`}
            value={verifyUrl}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#0f172a"}
            level={"H"}
            includeMargin={true}
            imageSettings={{
              src: "/favicon.ico", // Replace with your actual app logo
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <Button onClick={downloadQR} className="w-full" variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Download QR Tag
        </Button>
        <p className="text-xs text-slate-500 max-w-[250px]">
          Print and attach this to the animal's physical ear tag or stall.
        </p>
      </CardContent>
    </Card>
  );
}
