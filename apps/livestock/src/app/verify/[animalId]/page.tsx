import React from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle2, ShieldCheck, Activity, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// In a real app, you would fetch this from Prisma + Blockchain RPC
async function getAnimalProvenance(id: string) {
  // Mock data for demo purposes
  return {
    id,
    tagNumber: 'IND-789-456-123',
    name: 'Bessie',
    species: 'Cattle',
    breed: 'Gir',
    birthDate: '2023-05-12T00:00:00.000Z',
    owner: {
      name: 'Ramesh Farm Co.',
      location: 'Maharashtra, India',
    },
    blockchain: {
      network: 'Polygon PoS',
      contractAddress: '0x1234...5678',
      tokenId: '4592',
      verified: true,
    },
    timeline: [
      { id: 1, date: '2023-05-12', type: 'BIRTH', description: 'Born at Ramesh Farm Co.', hash: '0xabc...123' },
      { id: 2, date: '2023-06-01', type: 'VACCINATION', description: 'FMD Vaccine administered by Dr. Sharma', hash: '0xdef...456' },
      { id: 3, date: '2024-01-15', type: 'INSPECTION', description: 'Certified healthy by State Vet Board', hash: '0xghi...789' },
    ]
  };
}

export default async function VerifyPage({ params }: { params: { animalId: string } }) {
  const animal = await getAnimalProvenance(params.animalId);

  if (!animal) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <ShieldCheck className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Blockchain Verified Record
          </h1>
          <p className="text-lg text-slate-600">
            Authentic provenance and health history for Tag #{animal.tagNumber}
          </p>
        </div>

        {/* Animal Vital Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Animal Profile</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Name</p>
              <p className="text-lg font-semibold">{animal.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Species / Breed</p>
              <p className="text-lg font-semibold">{animal.species} • {animal.breed}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Date of Birth</p>
              <p className="text-lg font-semibold">{new Date(animal.birthDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Current Location</p>
              <p className="text-lg font-semibold truncate" title={animal.owner.location}>
                {animal.owner.location}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Status */}
        <Card className="bg-slate-900 text-slate-50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              On-Chain Ledger Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-400">Network:</span>
              <span className="text-blue-400">{animal.blockchain.network}</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span className="text-slate-400">Smart Contract:</span>
              <span className="truncate ml-4">{animal.blockchain.contractAddress}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-slate-400">Token ID:</span>
              <span>{animal.blockchain.tokenId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>History & Health Log</CardTitle>
            <CardDescription>Immutable events anchored to the blockchain.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-slate-200 ml-3 space-y-8">
              {animal.timeline.map((event, index) => (
                <div key={event.id} className="relative pl-6">
                  <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="font-semibold text-slate-900">{event.type}</h3>
                    <time className="text-sm text-slate-500 font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                  <p className="text-xs font-mono text-slate-400 bg-slate-100 inline-block px-2 py-1 rounded">
                    Tx: {event.hash}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
